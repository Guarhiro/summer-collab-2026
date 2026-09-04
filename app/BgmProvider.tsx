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
import { Music2, Pause, Play } from "lucide-react";

type BgmStatus = "idle" | "playing" | "paused" | "blocked";

type BgmContextValue = {
  isPlaying: boolean;
  playBgm: () => Promise<void>;
  pauseBgm: () => void;
};

const TARGET_VOLUME = 0.3;
const FADE_DURATION_MS = 900;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const audioSource = `${basePath}/media/koi-no-voyage/eternal-blue.mp3`;

const BgmContext = createContext<BgmContextValue | null>(null);

export function useBgm() {
  const value = useContext(BgmContext);

  if (!value) {
    throw new Error("useBgm must be used within BgmProvider");
  }

  return value;
}

export default function BgmProvider({ children }: { children: ReactNode }) {
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

  const playBgm = useCallback(async () => {
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
  }, [cancelFade, fadeTo]);

  const pauseBgm = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    playAttemptRef.current += 1;
    cancelFade();
    audio.pause();
    audio.volume = TARGET_VOLUME;
    setStatus("paused");
  }, [cancelFade]);

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
        aria-label={`${buttonLabel}：Eternal Blue`}
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
          <strong>Eternal Blue</strong>
        </span>
      </button>
    </BgmContext.Provider>
  );
}
