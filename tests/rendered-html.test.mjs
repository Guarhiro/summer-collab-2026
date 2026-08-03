import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/client/index.html", import.meta.url);

test("exports the finished one-page exhibition", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /<html lang="ja"/i);
  assert.match(html, /SUMMER COLLAB 2026/);
  assert.match(html, /あの夏を、/);
  assert.match(html, /青の境界/);
  assert.match(html, /潮騒ランデブー/);
  assert.match(html, /星灯りの約束/);
  assert.match(html, /風鈴花火/);
  assert.match(html, /background-video/);
  assert.match(html, /背景動画を停止/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("ships the scroll-ready media and GitHub Pages workflow", async () => {
  const [video, poster, workflow] = await Promise.all([
    stat(new URL("../public/media/summer-collab-background.mp4", import.meta.url)),
    stat(new URL("../public/media/summer-collab-poster.jpg", import.meta.url)),
    readFile(new URL("../.github/workflows/deploy-pages.yml", import.meta.url), "utf8"),
  ]);

  assert.ok(video.size > 1_000_000 && video.size < 10_000_000);
  assert.ok(poster.size > 50_000);
  assert.match(workflow, /actions\/configure-pages@v5/);
  assert.match(workflow, /actions\/upload-pages-artifact@v4/);
  assert.match(workflow, /actions\/deploy-pages@v4/);
  assert.match(workflow, /NEXT_PUBLIC_BASE_PATH/);

  await access(new URL("../public/favicon.png", import.meta.url));
  await access(new URL("../app/globals.css", import.meta.url));
  await access(root);
});
