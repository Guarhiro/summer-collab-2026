export const backgroundClips = Array.from(
  { length: 13 },
  (_, index) => `/media/background-clips/clip-${String(index + 1).padStart(2, "0")}.mp4${index === 9 ? "?v=1789011226634" : ""}`,
);

// Each round uses every clip once, including across the last/first boundary.
export function createShuffleBag(sources: readonly string[], random = Math.random) {
  if (!sources.length) throw new Error("A background playlist needs at least one clip");
  let remaining: string[] = [];
  let previous: string | undefined;

  return () => {
    if (!remaining.length) {
      remaining = [...sources];
      for (let index = remaining.length - 1; index > 0; index--) {
        const swap = Math.floor(random() * (index + 1));
        [remaining[index], remaining[swap]] = [remaining[swap], remaining[index]];
      }
      if (remaining.length > 1 && remaining[0] === previous) {
        const swap = 1 + Math.floor(random() * (remaining.length - 1));
        [remaining[0], remaining[swap]] = [remaining[swap], remaining[0]];
      }
    }
    previous = remaining.shift()!;
    return previous;
  };
}

export function createBackgroundPlayback(
  video: HTMLVideoElement,
  sources: readonly string[],
  onPauseRequired: () => void,
) {
  const next = createShuffleBag(sources);
  const failed = new Set<string>();
  let current: string;
  let paused = true;
  let advancePending = true;
  let unavailable = false;
  let disposed = false;
  let playRequest = 0;

  video.muted = true;
  video.loop = false;
  video.defaultPlaybackRate = 0.72;

  const syncPlayback = () => {
    const request = ++playRequest;
    if (disposed || paused || document.hidden) {
      video.pause();
      return;
    }

    if (advancePending) {
      if (failed.size === sources.length) {
        unavailable = true;
        paused = true;
        video.pause();
        onPauseRequired();
        return;
      }
      do { current = next(); } while (failed.has(current));
      advancePending = false;
      video.src = current;
      video.load();
    }

    video.playbackRate = 0.72;
    if (!video.paused) return;
    void video.play().catch((error: unknown) => {
      if (disposed || request !== playRequest || paused || document.hidden) return;
      const name = (error as { name?: string } | null)?.name;
      // Loading or pausing a new clip may cancel the previous play request.
      if (name === "AbortError") return;
      // A decoding/loading error has its own event and skips the failed clip.
      if (name === "NotSupportedError") {
        skipFailedClip();
        return;
      }
      paused = true;
      onPauseRequired();
    });
  };

  const finishClip = () => {
    advancePending = true;
    syncPlayback();
  };
  const skipFailedClip = () => {
    if (current) failed.add(current);
    finishClip();
  };
  const restoreSpeed = () => { video.playbackRate = 0.72; };

  video.addEventListener("ended", finishClip);
  video.addEventListener("error", skipFailedClip);
  video.addEventListener("loadedmetadata", restoreSpeed);
  video.addEventListener("canplay", syncPlayback);
  document.addEventListener("visibilitychange", syncPlayback);

  return {
    setPaused(value: boolean) {
      if (disposed) return;
      paused = value;
      if (!paused && unavailable) {
        failed.clear();
        unavailable = false;
      }
      syncPlayback();
    },
    dispose() {
      disposed = true;
      ++playRequest;
      video.removeEventListener("ended", finishClip);
      video.removeEventListener("error", skipFailedClip);
      video.removeEventListener("loadedmetadata", restoreSpeed);
      video.removeEventListener("canplay", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
      video.removeAttribute("src");
      video.load();
    },
  };
}
