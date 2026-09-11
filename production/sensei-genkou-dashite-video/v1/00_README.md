# 先生原稿出してくださいっ — 夏向け動画生成パッケージ v1

## 納品物

- `belphegor_summer_office_anchor_v1.png` — 動画の初期フレームとして使う縦9:16参照画像（1080×1920）
- `seedance_i2v_prompt_en.txt` — 参照画像を添付して使う英語のI2Vプロンプト
- `belphegor_summer_collab_landscape_anchor_v2.png` — 推奨の横16:9参照画像（1920×1080）
- `seedance_i2v_landscape_prompt_en.txt` — 横16:9アンカー専用の英語I2Vプロンプト

## 夏向けデザイン

横16:9版を推奨します。白いブラウス、黄緑の長髪、明るい編集室を保ったまま、窓からの真夏の白い日差しを主役にしています。ミルキーホワイト、ライム、淡いシアン、日差しのゴールドで、SUMMER COLLABらしい明るさを出しました。視線を上げるだけの小さな芝居に絞ることで、だるだるで余裕のある小悪魔的な表情を残し、手・髪・衣装の崩れを抑えます。

## 参照素材の役割

| 素材 | 役割 | 固定する要素 |
| --- | --- | --- |
| `belphegor_summer_office_anchor_v1.png` | 初期フレーム、人物同一性、構図、室内環境 | 顔、長い黄緑髪、白いブラウス、頬杖の姿勢、机、原稿、椅子、窓、光の向き |
| `belphegor_summer_collab_landscape_anchor_v2.png` | 横16:9の推奨初期フレーム、人物同一性、夏の色設計 | 顔、長い黄緑髪、白いブラウス、頬杖の姿勢、窓、夏の光、オフィスの配置 |

入力画像はこのアンカー1枚だけです。`@`参照を使わないため、画像1枚・`@`参照0件で入力枠を余裕を持って使えます。

## 使用方法

1. `belphegor_summer_collab_landscape_anchor_v2.png` を動画生成画面の参照画像として添付します。
2. `seedance_i2v_landscape_prompt_en.txt` の内容を貼り付けます。
3. BGMは動画生成後に別途重ねます。プロンプト内ではセリフとBGMを禁止し、遠い蝉の環境音だけを指定しています。

## 再デザイン用の静止画アンカープロンプト

```text
Use case: illustration-story
Asset type: 16:9 landscape initial-frame reference for an anime video
Primary request: a single young female fantasy novelist named Belphegor, sitting at a manuscript-covered desk in a bright editorial office during late summer; she rests her cheek on one palm and looks toward the viewer with a lazy, teasing half-lidded smile
Subject: long glossy lime-green hair, green eyes, white frilled collared blouse, black skirt, slim seated pose, one hand supporting her cheek and the other hand naturally resting on the desk
Scene/backdrop: clean sunlit editorial office, black work chair, loose manuscript pages, a wide window admitting bright midsummer daylight and soft green reflections
Style/medium: polished hand-drawn anime illustration, refined linework, clean cel shading with gentle glossy highlights
Composition/framing: 16:9 landscape, eye-level medium close-up, face and the cheek-supporting hand fully readable, desk visible at the lower edge, clear window-side negative space
Lighting/mood: high-key midsummer white sunlight from the window, milky white, lime, pale cyan, and soft gold reflections; sleepy and mischievous mood
Constraints: one character only; preserve a relaxed seated posture; no costume changes; no readable text, logos, watermark, extra hands, or extra props
Avoid: horror mood, heavy magical effects, excessive wind, dramatic action, particles, or background characters
Minimal use of glitter, particles, and light flecks. Only add them to the necessary parts for a clean and focused illustration.
```

## 画像の出所・検証

元絵 `public/media/sensei-genkou-dashite/cover.webp` は変更せず、夏向けの明るい色調と縦9:16構図へ非破壊で調整しました。

- 元絵 SHA-256: `a6f441b78d9593dabd07f69824c75ab1cb405178bcac1428e3e2789177a149ba`
- 動画アンカー SHA-256: `011d356d503c2dbb2c3c9b60bc712b2a0182180804bc6c6a4b64228ed2ecb2f5`
- 横16:9アンカー SHA-256: `407182fdbada235ea5f90b57095ef2d8d500216adc68fbfb6d4367d3d84e4625`
