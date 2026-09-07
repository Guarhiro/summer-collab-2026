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

type BgmTrack = "eternal-blue" | "breezy-seaside-romance";

type BgmStatus = "idle" | "playing" | "paused" | "blocked";

type BgmContextValue = {
  isPlaying: boolean;
  playBgm: (track?: BgmTrack) => Promise<void>;
  pauseBgm: () => void;
};

const TARGET_VOLUME = 0.3;
const FADE_DURATION_MS = 900;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const tracks = {
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
    : pathname?.includes("/koi-no-koukai") ? "eternal-blue" : undefined;
  const [track, setTrack] = useState<BgmTrack>(routeTrack ?? "eternal-blue");
  const trackRef = useRef(track);
  const audioSource = tracks[track].src;
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
        const progress = Math.min(1, (now - startedAt) / duration);
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

  const pauseBgm = useCallback(() => {
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
    const resume = audioRef.current && !audioRef.current.paused;
    selectTrack(routeTrack);
    if (resume) void playBgm();
  }, [routeTrack, selectTrack, playBgm]);

  useEffect(() => cancelFade, [cancelFade]);

  const contextValue = useMemo<BgmContextValue>(
    () => ({
      isPlaying: status === "playing",
      playBgm,
      pauseBgm,
    }),
    [pauseBgm, playBgm, status],
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
