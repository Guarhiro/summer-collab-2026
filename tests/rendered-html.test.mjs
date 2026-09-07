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
  assert.match(html, /友達は推しと付き合いたい！/);
  assert.match(html, /ビーチでも紅に飾って！/);
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
    /<a\b(?=[^>]*class="project-link")(?=[^>]*href="\/koi-no-koukai\/")([^>]*)>/,
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

test("exports the persistent Eternal Blue BGM UI and audio", async () => {
  const [
    mainHtml,
    detailHtml,
    sourceAudio,
    exportedAudio,
    providerSource,
    layoutSource,
    homeSource,
    gallerySource,
    viteConfig,
  ] = await Promise.all([
    readFile(output, "utf8"),
    readFile(detailOutput, "utf8"),
    stat(
      new URL(
        "../public/media/koi-no-voyage/eternal-blue.mp3",
        import.meta.url,
      ),
    ),
    stat(
      new URL(
        "../dist/client/media/koi-no-voyage/eternal-blue.mp3",
        import.meta.url,
      ),
    ),
    readFile(new URL("../app/BgmProvider.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../app/koi-no-koukai/CharacterGallery.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  for (const html of [mainHtml, detailHtml]) {
    const audioTag = html.match(/<audio\b[^>]*data-site-bgm[^>]*>/)?.[0];
    assert.ok(audioTag, "the shared BGM audio element is rendered");
    assert.match(audioTag, /src="\/media\/koi-no-voyage\/eternal-blue\.mp3"/);
    assert.match(audioTag, /\bloop(?:=""|(?=[\s>]))/);
    assert.doesNotMatch(audioTag, /\bautoplay/i);
    assert.match(html, /data-bgm-control/);
    assert.match(html, /Eternal Blue/);
  }

  assert.match(mainHtml, /data-bgm-trigger="project-card"/);
  assert.match(mainHtml, /data-bgm-trigger="gallery-card"/);
  assert.ok(sourceAudio.size > 5_000_000 && sourceAudio.size < 8_000_000);
  assert.equal(exportedAudio.size, sourceAudio.size);
  assert.match(providerSource, /const TARGET_VOLUME = 0\.3/);
  assert.match(providerSource, /const FADE_DURATION_MS = 900/);
  assert.match(layoutSource, /<BgmProvider>{children}<\/BgmProvider>/);
  assert.match(layoutSource, /data-rsc-content-type-bridge/);
  assert.match(layoutSource, /contentType === "application\/octet-stream"/);
  assert.match(layoutSource, /headers\.set\("content-type", "text\/x-component"\)/);
  assert.match(homeSource, /import Link from "next\/link"/);
  assert.match(gallerySource, /import Link from "next\/link"/);
  assert.match(viteConfig, /process\.env\.__NEXT_ROUTER_BASEPATH/);
  assert.ok(
    mainHtml.indexOf("data-rsc-content-type-bridge") <
      mainHtml.indexOf('<script id="_R_">'),
    "the GitHub Pages RSC bridge runs before the application module",
  );
});

test("the first work opens the supplied story and ships all five images", async () => {
  const [home, story] = await Promise.all([
    readFile(output, "utf8"),
    readFile(new URL("../dist/client/tomodachi-oshi/index.html", import.meta.url), "utf8"),
  ]);
  assert.match(home, /<a\b(?=[^>]*class="project-link")(?=[^>]*href="\/tomodachi-oshi\/")[^>]*>/);
  assert.doesNotMatch(home, /青の境界|summer-collab-01/);
  for (const content of ["友達は", "付き合いたい！", "柳田 莉音", "三条 オト", "お願い{{user}}、オト君海に誘ったから距離縮めるの手伝って！", "むぶ", "最古参", "ASMR"]) {
    assert.ok(story.replace(/<!--.*?-->/g, "").includes(content), `story includes ${content}`);
  }
  for (const filename of ["cover.png", "rion-1.png", "rion-2.png", "oto-1.png", "oto-2.png"]) {
    const [original, exported] = await Promise.all([
      readFile(new URL(`../public/media/tomodachi-oshi/${filename}`, import.meta.url)),
      readFile(new URL(`../dist/client/media/tomodachi-oshi/${filename}`, import.meta.url)),
    ]);
    assert.deepEqual(exported, original);
    assert.ok(story.includes(`/media/tomodachi-oshi/${filename}`));
  }
  assert.match(story, /href="\/#work-01"/);
});

test("the first story has its own looped soundtrack and title", async () => {
  const html = await readFile(new URL("../dist/client/tomodachi-oshi/index.html", import.meta.url), "utf8");
  const audio = html.match(/<audio\b[^>]*data-site-bgm[^>]*>/)?.[0];
  assert.ok(audio);
  assert.match(audio, /src="\/media\/tomodachi-oshi\/breezy-seaside-romance\.mp3"/);
  assert.match(audio, /\bloop/);
  assert.doesNotMatch(audio, /autoplay/);
  assert.match(html, /BGMを再生：Breezy Seaside Romance/);
  const [source, exported] = await Promise.all([
    readFile(new URL("../public/media/tomodachi-oshi/breezy-seaside-romance.mp3", import.meta.url)),
    readFile(new URL("../dist/client/media/tomodachi-oshi/breezy-seaside-romance.mp3", import.meta.url)),
  ]);
  assert.ok(source.length > 1_000_000);
  assert.deepEqual(exported, source);
});
