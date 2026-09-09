import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../app/backgroundPlaylist.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
});

function setup() {
  const document = new EventTarget();
  document.hidden = false;
  const context = vm.createContext({ exports: {}, document });
  vm.runInContext(outputText, context);
  class Video extends EventTarget {
    src = "";
    paused = true;
    currentTime = 0;
    loads = [];
    playError = null;
    load() {
      this.currentTime = 0;
      this.paused = true;
      if (this.src) this.loads.push(this.src);
    }
    play() {
      if (this.playError) return Promise.reject(this.playError);
      this.paused = false;
      return Promise.resolve();
    }
    pause() { this.paused = true; }
    removeAttribute(name) { if (name === "src") this.src = ""; }
  }
  const video = new Video();
  let pauseRequests = 0;
  const { backgroundClips, createShuffleBag, createBackgroundPlayback } = context.exports;
  const paths = backgroundClips.map((path) => `/summer-collab-2026${path}`);
  const playback = createBackgroundPlayback(video, paths, () => pauseRequests++);
  return {
    video, playback, document, paths, createShuffleBag,
    pauseRequests: () => pauseRequests,
    emit: (name) => video.dispatchEvent(new Event(name)),
    visibility(hidden) {
      document.hidden = hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    },
  };
}

test("each shuffle round includes every clip without a repeat at its boundary", () => {
  const { paths, createShuffleBag } = setup();
  // Extremes exercise the boundary correction as well as ordinary shuffles.
  for (const random of [() => 0, () => 0.999999, Math.random]) {
    const next = createShuffleBag(paths, random);
    let last;
    for (let round = 0; round < 50; round++) {
      const clips = Array.from({ length: paths.length }, next);
      assert.equal(new Set(clips).size, paths.length);
      assert.deepEqual([...clips].sort(), [...paths].sort());
      assert.notEqual(clips[0], last);
      last = clips.at(-1);
    }
  }
});

test("starts one muted clip and advances on completion with the deployment base path and original speed", () => {
  const { video, playback, emit, paths } = setup();
  assert.equal(video.loads.length, 0);
  playback.setPaused(false);
  assert.equal(video.loads.length, 1);
  assert.ok(paths.includes(video.src));
  assert.equal(video.muted, true);
  assert.equal(video.loop, false);
  assert.equal(video.playbackRate, 0.72);
  for (let count = 1; count < paths.length; count++) emit("ended");
  assert.equal(new Set(video.loads).size, paths.length);
  const last = video.src;
  emit("ended");
  assert.notEqual(video.src, last);
  video.playbackRate = 1;
  emit("loadedmetadata");
  assert.equal(video.playbackRate, 0.72);
});

test("pause and tab visibility preserve the current clip and manual pause", () => {
  const { video, playback, visibility, emit } = setup();
  playback.setPaused(false);
  video.currentTime = 7;
  playback.setPaused(true);
  visibility(true);
  visibility(false);
  emit("canplay");
  assert.equal(video.paused, true);
  assert.equal(video.currentTime, 7);
  assert.equal(video.loads.length, 1);
  playback.setPaused(false);
  assert.equal(video.paused, false);
  visibility(true);
  assert.equal(video.paused, true);
  visibility(false);
  assert.equal(video.paused, false);
  assert.equal(video.currentTime, 7);
  assert.equal(video.loads.length, 1);
});

test("reduced motion can keep the poster without loading clips; a hidden ending waits for return", () => {
  const { video, playback, emit, visibility } = setup();
  playback.setPaused(true);
  emit("canplay");
  assert.equal(video.loads.length, 0);
  playback.setPaused(false);
  visibility(true);
  emit("ended");
  assert.equal(video.loads.length, 1);
  visibility(false);
  assert.equal(video.loads.length, 2);
});

test("failed clips are skipped, and an entirely unavailable playlist stops instead of looping requests", () => {
  const { video, playback, emit, pauseRequests, paths } = setup();
  playback.setPaused(false);
  const failed = video.src;
  emit("error");
  assert.notEqual(video.src, failed);
  for (let count = 0; count < 24; count++) emit("ended");
  assert.equal(video.loads.slice(1).includes(failed), false);
  for (let count = 1; count < paths.length; count++) emit("error");
  assert.equal(pauseRequests(), 1);
  const attempts = video.loads.length;
  emit("canplay");
  assert.equal(video.loads.length, attempts);
  assert.equal(video.paused, true);
  playback.setPaused(false);
  assert.equal(video.loads.length, attempts + 1);
  assert.equal(video.paused, false);
});

test("autoplay restrictions request manual resume; aborted or stale requests do not pause a newer clip", async () => {
  const restricted = setup();
  restricted.video.playError = { name: "NotAllowedError" };
  restricted.playback.setPaused(false);
  await Promise.resolve();
  assert.equal(restricted.pauseRequests(), 1);
  restricted.video.playError = null;
  restricted.playback.setPaused(false);
  assert.equal(restricted.video.paused, false);
  assert.equal(restricted.video.loads.length, 1);

  const aborted = setup();
  aborted.video.playError = { name: "AbortError" };
  aborted.playback.setPaused(false);
  await Promise.resolve();
  assert.equal(aborted.pauseRequests(), 0);

  const stale = setup();
  stale.video.playError = { name: "NotAllowedError" };
  stale.playback.setPaused(false);
  stale.video.playError = null;
  stale.emit("error");
  await Promise.resolve();
  assert.equal(stale.pauseRequests(), 0);
  assert.equal(stale.video.paused, false);
});

test("unmount stops playback and removes all listeners", () => {
  const { video, playback, emit, visibility } = setup();
  playback.setPaused(false);
  playback.dispose();
  emit("ended");
  emit("error");
  emit("canplay");
  visibility(true);
  visibility(false);
  assert.equal(video.src, "");
  assert.equal(video.paused, true);
  assert.equal(video.loads.length, 1);
});
