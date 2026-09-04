import assert from "node:assert/strict";
import { access, readFile, stat } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);
const output = new URL("../dist/client/index.html", import.meta.url);
const detailOutput = new URL(
  "../dist/client/koi-no-koukai/index.html",
  import.meta.url,
);

const characterAssets = [
  "garu",
  "toma",
  "moka",
  "sazanami",
  "so",
  "iori",
  "tsuyuri",
  "kyoka",
  "mahoro",
  "kotori",
  "shiori",
  "kirara",
];

test("exports the finished one-page exhibition", async () => {
  const html = await readFile(output, "utf8");

  assert.match(html, /<html lang="ja"/i);
  assert.match(html, /SUMMER COLLAB 2026/);
  assert.match(html, /あの夏を、/);
  assert.match(html, /青の境界/);
  assert.match(html, /潮騒ランデブー/);
  assert.match(html, /星灯りの約束/);
  assert.match(html, /風鈴花火/);
  assert.match(html, /恋の航海/);
  assert.match(html, /五つの物語/);
  assert.match(html, /href="\/koi-no-koukai\/"/);
  assert.match(html, /background-video/);
  assert.match(html, /背景動画を停止/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/);
});

test("exports the 12-character introduction with an internal return path", async () => {
  const [mainHtml, detailHtml] = await Promise.all([
    readFile(output, "utf8"),
    readFile(detailOutput, "utf8"),
  ]);
  const internalProjectLink = mainHtml.match(
    /<a class="project-link" href="\/koi-no-koukai\/"([^>]*)>/,
  );

  assert.ok(internalProjectLink, "the fifth project links to the character page");
  assert.doesNotMatch(internalProjectLink[1], /target="_blank"/);
  assert.match(detailHtml, /恋の航海/);
  assert.match(detailHtml, /~Voyage on the Eternal Blue~/);
  assert.match(detailHtml, /href="\/"[^>]*>[^<]*<span>SUMMER COLLAB<\/span>/);

  const cards = [...detailHtml.matchAll(/data-character-card="([^"]+)"/g)].map(
    (match) => match[1],
  );
  assert.deepEqual(cards, characterAssets);

  for (const name of [
    "牙琉",
    "冬真",
    "もか",
    "漣",
    "騒",
    "伊織",
    "つゆり",
    "棘",
    "まほろ",
    "ことり",
    "汐莉",
    "きらら",
  ]) {
    assert.match(detailHtml, new RegExp(name));
  }
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
  await access(new URL("../public/media/koi-no-voyage/cover-card.jpg", import.meta.url));
  await Promise.all(
    characterAssets.map((asset) =>
      access(
        new URL(
          `../public/media/koi-no-voyage/characters/${asset}.jpg`,
          import.meta.url,
        ),
      ),
    ),
  );
  await access(root);
});
