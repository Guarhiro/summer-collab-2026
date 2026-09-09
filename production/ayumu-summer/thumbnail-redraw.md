# 作品18・一覧用の横長サムネイル

- 依頼：一覧画面のサムネイルを、ロゴを排除した横長の絵として描き直し、掲載してpushする。
- 生成方法：内蔵 imagegen。
- 採用画像：`public/media/ayumu-summer/cover-wide-v1.png`
- サイズ：1672 × 940 px（ほぼ16:9）。
- 掲載箇所：メインページの18番カード、および下部の作品ギャラリー。
- 主参照：`public/media/ayumu-summer/cover.jpg`
- 補助参照：`public/media/ayumu-summer/ayumu-3.jpg`

## 目視確認

- 文字・作品タイトル・コラボロゴ・年号・透かし・装飾枠が残っていない。
- 登場人物は歩夢一人。金髪、琥珀色の瞳、紫青レンズのサングラス、耳のリング、青緑のシャツと黄色い花柄を確認。
- 顔と上半身を大きく見せる横構図で、背景に青空と夏の海が見える。
- 頭頂の髪の一部は画像上端の外にある。「髪全体を画面に収める」という補助指示は完全には満たしていないが、元表紙に近い顔寄りの構図として採用。顔とサングラスの主要部は視認できる。
- 一覧には画像全体を表示する。詳細ページは既存の表紙画像を参照する。

## 実際の生成プロンプト

```text
Use case: identity-preserve
Asset type: one final Japanese anime illustration for a website work-list thumbnail.
Primary request: Redraw the portrait cover into a clean landscape illustration, horizontal 16:9, ideally 2048 x 1152. Exactly ONE finished image; no variants, no contact sheet. This is a full redraw with a naturally recomposed landscape layout, not a crop, stretch, or collage.

Input images:
Image 1 (cover.jpg) is the EDIT TARGET and authoritative reference for the character's face, hair, expression, outfit, rendering style and summer colors.
Image 2 (ayumu-3.jpg) is SUPPORTING IDENTITY AND ANATOMY REFERENCE ONLY. Do not copy its orange shirt, pose, necklace or bracelets.

Subject: Same adult 24-year-old man, Yanagawa Ayumu (柳川歩夢). Preserve his recognizable face shape and tousled layered golden-blonde hair, warm amber eyes under relaxed lids, lightly blushing cheeks, playful flirtatious expression, small visible canine, silver ear hoop, and black-framed sunglasses with violet-blue lenses resting on his head. Keep the cover's teasing tilted-head expression and coherent mouth anatomy; a subtle visible tongue and its tiny silver piercing may follow the cover, with no exaggerated saliva. Preserve the cover's TEAL/GREEN tropical shirt with YELLOW HIBISCUS and open collar. The shirt must not be orange.

Scene/backdrop: Bright summer cyan ocean, vivid blue sky and soft white clouds, matching the cover's sunny seaside atmosphere. No new props and no other people.

Style/medium: Polished high-quality Japanese anime illustration. Preserve the cover's vivid clean anime rendering, attractive precise face, crisp fine linework, luminous golden hair, clear colors, graceful anatomy and soft dimensional shading.

Composition/framing: Full bleed landscape 16:9. Naturally recompose his head and upper torso across the landscape canvas. His tilted face is the dominant focal point, large and readable as a small thumbnail, with both eyes clearly legible. Keep ALL of his hair and the entire pair of sunglasses inside the frame with modest breathing room above and beside them. Include enough teal floral shoulders and open collar to clearly establish the costume. Let the ocean and sky fill the surrounding frame naturally; no blank or empty text panel. Do not force the portrait reference's tall layout into a landscape crop.

Constraints: Remove ALL lettering, typography, title, logos, year numbers, collaboration badge, border graphics, decorative hearts, stickers, watermarks and text-like marks. No added text of any language, no signature. Exactly one character. No extra limbs, warped eyes, incoherent jewelry, distorted sunglasses, exaggerated saliva, extra props or people.
```
