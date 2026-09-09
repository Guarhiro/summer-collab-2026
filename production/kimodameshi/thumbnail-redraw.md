# 作品17「肝試されてるのお前じゃん！」一覧用サムネイル

## 採用画像

- 掲載先：作品一覧と下部ギャラリー。
- 保存先：`public/media/kimodameshi/cover-wide-v1.png`。
- 実寸：1672 × 941 px（約16:9）。
- SHA-256：`22c081513836975dff18354cef3511df52390f4d578e2b1fb09ca295186291cd`。
- 元画像：`public/media/kimodameshi/cover.png`。
- 使用ツール：組み込み `image_gen.imagegen`。文字などを除去して横長に再生成した後、頭頂部の余白を確保する構図修正を1回実施。
- 採用出力：`/Users/guarhiro/.codex/generated_images/01a085ec-c92a-72a3-befb-e30964dfde54/exec-d52bc60d-f2c7-41f7-a18e-3d8f3107519b.png`。追加の画像加工をせずコピーして使用。
- 最終修正の参照：同じ組み込みツールによる初回出力 `exec-8199455c-1e8c-4e66-8e51-c97d917bcc03.png`。

## 目視確認

文字・数字・ロゴ・吹き出し・網点などの装飾が残っていないことを確認。主役の白髪の頭頂部から顎まで収まり、両目といたずらっぽい笑みが明瞭。白髪、灰色の瞳、ピアス、白シャツと暗いネクタイ、夜の廃校の青い雰囲気を維持。奥の黒髪人物は小さく、主役の顔が中心となる構図。

作品17専用の `object-fit: contain` を維持し、一覧とギャラリーで画像全体を表示。作品紹介ページの元サムネイルとキャラクター画像、紹介文、BGMは今回の変更対象に含めない。

## 初回生成プロンプト

```text
Use case: identity-preserve.
Asset type: one finished anime scene illustration for a website listing thumbnail.
Input image: the attached local cover.png is the edit target and the authoritative reference for the main character's identity, expression, illustration style and moonlit abandoned-school setting.

Primary request: Redraw this same scene cleanly as a 16:9 landscape illustration, 1536 by 864 pixels. Remove every graphic overlay and create a coherent complete illustration in the newly revealed areas. This is a clean scene image, not a poster, manga panel or graphic layout.

Subject and identity: Preserve the reference's main silver-white-haired 18-year-old male ghost, Enokido Shirabe. Closely match his delicate anime facial features, layered tousled silver-white hair, pale skin, grey eyes, dark ear piercings, slightly tilted head, playful confident mischievous smile with visible teeth, white collared shirt and dark necktie. Preserve the reference expression and recognizable face. He peeks and leans playfully around the vertical door frame at the right, looking directly toward the viewer; his hand gently holds the frame. Keep the hand anatomically clear and natural.

Composition: A close upper-body view in a wide 16:9 composition. Position the main character's complete head and face near the center of the image, slightly to the right of center, large enough that his eyes and smile are immediately legible as a listing thumbnail. The entire hair silhouette must fit comfortably inside the image with clear margin above the hair, and the entire jaw and chin must be visible with margin below the chin. Show some shoulder, shirt and dark tie below his face. Do not crop the top of his head or his face. His face must not be blocked by the door frame. Keep the tilted peeking gesture. Extend the blue moonlit abandoned-school corridor across the left side with perspective, windows, subtle moonlight and the same subdued atmosphere. The existing small black-haired figure may remain discreetly in the far-left distant corridor, very small and secondary; do not add any other people or create a second focal point.

Style and lighting: Match the polished anime illustration style of the reference, refined delicate linework, luminous layered silver hair, smooth shaded skin, crisp expressive grey eyes, cool blue moonlight, dark navy corridor and door, gentle highlights and dimensional cel/painterly shading. Keep the humorous spooky mood without gore.

Absolute removal constraints: No Japanese writing, English writing, other lettering, digits, logo, badge, watermark, title, caption block, banner, speech balloon, bubble outline, comic sound effect, comic border, dot screen, halftone pattern, or decorative graphic overlay anywhere. Remove all of the reference's typography, top strip, speech balloons, large title, bottom-right badge and halftone dots. Paint coherent hair, shirt, corridor or shadow in their places. No blank white shapes left by removed balloons. Produce exactly one polished image; no variants or collage.
```

## 最終修正プロンプト

```text
Use case: identity-preserve.
Asset type: final anime scene illustration for a website listing thumbnail.
Input image: this clean landscape illustration is the edit target.

Make ONE NECESSARY FRAMING CORRECTION ONLY: Pull the camera back enough to reveal the main white-haired character's entire hair silhouette and add clear dark corridor/background headroom above every strand. The current image clips the top of his hair; repair that. Recompose directly into a wide 16:9 landscape canvas, preferably 2048 by 1152 pixels, without cropping the head. Place the topmost hair around 9 percent down from the top edge, and his chin around 68 percent down. His complete head from hair to chin should occupy about 59 percent of the image height. Show more of the shirt and upper torso underneath. The face must remain prominent near the center, slightly right of center; both grey eyes and the full mischievous smiling mouth are clearly readable. Keep a continuous margin of visible background above all hair, including flyaway strands. There must be no contact between hair and the top image edge.

Preserve the exact recognizable character, face, head tilt, silver-white hairstyle, pale skin, grey eyes, mischievous tooth-showing smile, dark ear piercings, white collared shirt, dark tie, leaning around the right-hand door frame and fingers holding that frame. Preserve the fine polished anime rendering, cool blue moonlight, the abandoned school corridor extending on the left, and the tiny distant black-haired figure as a discreet secondary element. Do not add characters or change the expression. Extend and repaint the scene coherently to achieve the wider view with headroom; do not add borders or letterboxing.

Keep the clean image entirely free of text, writing in every language, digits, logos, badges, watermarks, captions, banners, speech balloons, bubble outlines, sound effects, comic borders, halftone dots or decorative graphic overlays. Exactly one finished corrected scene illustration, no variants, no collage.
```
