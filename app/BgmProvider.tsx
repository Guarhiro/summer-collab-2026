"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { Music2, Pause, Play } from "lucide-react";

export type BgmTrack = "oni-training-candy-forecast" | "egao-sunlit-rivalry" | "summer-house-bell" | "poolside-afternoon" | "cicada-summer" | "neon-pool-reflections" | "moonlit-seaside-walk" | "turquoise-terrace" | "sunlit-rivalry" | "festival-heartbeat" | "eternal-blue" | "breezy-seaside-romance" | "sunny-beach-afternoon";

type BgmStatus = "idle" | "playing" | "paused" | "blocked";

type BgmContextValue = {
  isPlaying: boolean;
  playBgm: (track?: BgmTrack) => Promise<void>;
  pauseBgm: () => void;
  followBgm: (track: BgmTrack) => void;
};

const TARGET_VOLUME = 0.3;
const FADE_DURATION_MS = 900;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const tracks = {
  "oni-training-candy-forecast": { title: "鬼訓練のち、飴予報", src: `${basePath}/media/gachimuchi-paisen/oni-training-candy-forecast.mp3` },
  "egao-sunlit-rivalry": { title: "Sunlit Rivalry-2", src: `${basePath}/media/egao-kensei/sunlit-rivalry-2.mp3` },
  "summer-house-bell": { title: "Summer House Bell", src: `${basePath}/media/kimi-no-shiranai-natsu/summer-house-bell.mp3` },
  "poolside-afternoon": { title: "Poolside Afternoon", src: `${basePath}/media/natsuiro-oniisan/poolside-afternoon.mp3` },
  "cicada-summer": { title: "cicada summer", src: `${basePath}/media/natsukage/cicada-summer.mp3` },
  "neon-pool-reflections": { title: "Neon Pool Reflections", src: `${basePath}/media/everlasting-summer-night/neon-pool-reflections.mp3` },
  "moonlit-seaside-walk": { title: "Moonlit Seaside Walk", src: `${basePath}/media/summer-vampire/moonlit-seaside-walk.mp3` },
  "turquoise-terrace": { title: "Turquoise Terrace", src: `${basePath}/media/lepus/turquoise-terrace.mp3` },
  "sunlit-rivalry": { title: "Sunlit Rivalry", src: `${basePath}/media/shinyu-gikei/sunlit-rivalry.mp3` },
  "festival-heartbeat": { title: "Festival Heartbeat", src: `${basePath}/media/saioshi-natsumatsuri/festival-heartbeat.mp3` },
  "sunny-beach-afternoon": { title: "晴れたビーチの午後", src: `${basePath}/media/beach-beni/sunny-beach-afternoon.mp3` },
  "eternal-blue": { title: "Eternal Blue", src: `${basePath}/media/koi-no-voyage/eternal-blue.mp3` },
  "breezy-seaside-romance": { title: "Breezy Seaside Romance", src: `${basePath}/media/tomodachi-oshi/breezy-seaside-romance.mp3` },
};

const BgmContext = createContext<BgmContextValue | null>(null);

export function useBgm() {
  const value = useContext(BgmContext);

  if (!value) {
    throw new Error("useBgm must be used within BgmProvider");
  }

  return value;
}

export default function BgmProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const routeTrack: BgmTrack | undefined = pathname?.includes("/tomodachi-oshi")
    ? "breezy-seaside-romance"
    : pathname?.includes("/saioshi-natsumatsuri") ? "festival-heartbeat"
    : pathname?.includes("/beach-beni") ? "sunny-beach-afternoon"
    : pathname?.includes("/gachimuchi-paisen") ? "oni-training-candy-forecast"
    : pathname?.includes("/egao-kensei") ? "egao-sunlit-rivalry"
    : pathname?.includes("/shinyu-gikei") ? "sunlit-rivalry"
    : pathname?.includes("/everlasting-summer-night") ? "neon-pool-reflections"
    : pathname?.includes("/summer-vampire") ? "moonlit-seaside-walk"
    : pathname?.includes("/natsuiro-oniisan") ? "poolside-afternoon"
    : pathname?.includes("/natsukage") ? "cicada-summer"
    : pathname?.includes("/kimi-no-shiranai-natsu") ? "summer-house-bell"
    : pathname?.includes("/lepus") ? "turquoise-terrace"
    : pathname?.includes("/koi-no-koukai") ? "eternal-blue" : undefined;
  const [track, setTrack] = useState<BgmTrack>(routeTrack ?? "eternal-blue");
  const trackRef = useRef(track);
  const [audioSource] = useState(tracks[track].src);
  const manuallyPausedRef = useRef(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeFrameRef = useRef<number>(0);
  const playAttemptRef = useRef(0);
  const [status, setStatus] = useState<BgmStatus>("idle");

  const cancelFade = useCallback(() => {
    if (fadeFrameRef.current) {
      window.cancelAnimationFrame(fadeFrameRef.current);
      fadeFrameRef.current = 0;
    }
  }, []);

  const fadeTo = useCallback(
    (targetVolume: number, duration: number) => {
      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      const startVolume = audio.volume;
      const startedAt = window.performance.now();

      const step = (now: number) => {
        const progress = Math.max(0, Math.min(1, (now - startedAt) / duration));
        const eased = 1 - Math.pow(1 - progress, 3);
        audio.volume = startVolume + (targetVolume - startVolume) * eased;

        if (progress < 1) {
          fadeFrameRef.current = window.requestAnimationFrame(step);
        } else {
          fadeFrameRef.current = 0;
        }
      };

      fadeFrameRef.current = window.requestAnimationFrame(step);
    },
    [cancelFade],
  );

  const selectTrack = useCallback((nextTrack: BgmTrack) => {
    const audio = audioRef.current;
    if (!audio || nextTrack === trackRef.current) return;
    playAttemptRef.current += 1;
    cancelFade();
    audio.pause();
    trackRef.current = nextTrack;
    audio.src = tracks[nextTrack].src;
    audio.load();
    setTrack(nextTrack);
    setStatus("idle");
  }, [cancelFade]);

  const playBgm = useCallback(async (nextTrack?: BgmTrack) => {
    manuallyPausedRef.current = false;
    if (nextTrack) selectTrack(nextTrack);
    const audio = audioRef.current;
    if (!audio) return;

    if (!audio.paused) {
      if (audio.volume < TARGET_VOLUME) {
        fadeTo(TARGET_VOLUME, FADE_DURATION_MS);
      }
      setStatus("playing");
      return;
    }

    cancelFade();
    audio.volume = 0;
    const attempt = ++playAttemptRef.current;

    try {
      await audio.play();
      if (attempt !== playAttemptRef.current) return;
      setStatus("playing");
      fadeTo(TARGET_VOLUME, FADE_DURATION_MS);
    } catch {
      if (attempt !== playAttemptRef.current) return;
      audio.volume = TARGET_VOLUME;
      setStatus("blocked");
    }
  }, [cancelFade, fadeTo, selectTrack]);

  const followBgm = useCallback((nextTrack: BgmTrack) => {
    if (manuallyPausedRef.current) {
      selectTrack(nextTrack);
      setStatus("paused");
      return;
    }
    void playBgm(nextTrack);
  }, [playBgm, selectTrack]);

  const pauseBgm = useCallback(() => {
    manuallyPausedRef.current = true;
    const audio = audioRef.current;
    if (!audio) return;

    playAttemptRef.current += 1;
    cancelFade();
    audio.pause();
    audio.volume = TARGET_VOLUME;
    setStatus("paused");
  }, [cancelFade]);

  useEffect(() => {
    if (!routeTrack || routeTrack === trackRef.current) return;
    followBgm(routeTrack);
  }, [routeTrack, followBgm]);

  useEffect(() => cancelFade, [cancelFade]);

  const contextValue = useMemo<BgmContextValue>(
    () => ({
      isPlaying: status === "playing",
      playBgm,
      pauseBgm,
      followBgm,
    }),
    [pauseBgm, playBgm, followBgm, status],
  );

  const isPlaying = status === "playing";
  const buttonLabel = isPlaying ? "BGMを停止" : "BGMを再生";
  const statusLabel =
    status === "playing"
      ? "NOW PLAYING"
      : status === "blocked"
        ? "TAP TO PLAY"
        : status === "paused"
          ? "PAUSED"
          : "BGM";

  return (
    <BgmContext.Provider value={contextValue}>
      {children}
      <audio
        ref={audioRef}
        data-site-bgm
        src={audioSource}
        loop
        preload="metadata"
        onPlay={() => setStatus("playing")}
        onPause={() =>
          setStatus((current) => (current === "idle" ? current : "paused"))
        }
        onError={() => setStatus("blocked")}
      />
      <button
        className={`bgm-control${status === "blocked" ? " is-blocked" : ""}`}
        type="button"
        data-bgm-control
        data-bgm-state={status}
        aria-label={`${buttonLabel}：${tracks[track].title}`}
        aria-pressed={isPlaying}
        onClick={() => {
          if (isPlaying) {
            pauseBgm();
          } else {
            void playBgm();
          }
        }}
      >
        <span className="bgm-control-icon" aria-hidden="true">
          <Music2 className="bgm-note" size={15} strokeWidth={1.6} />
          {isPlaying ? (
            <Pause size={10} fill="currentColor" />
          ) : (
            <Play size={10} fill="currentColor" />
          )}
        </span>
        <span className="bgm-control-copy">
          <small>{statusLabel}</small>
          <strong>{tracks[track].title}</strong>
        </span>
      </button>
    </BgmContext.Provider>
  );
}
