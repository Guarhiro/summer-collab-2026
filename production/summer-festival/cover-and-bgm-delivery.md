# SUMMER FESTIVAL 一覧用表紙・BGM

## 一覧用表紙

- 配置：作品19の一覧カードと下部ギャラリー。
- 保存先：`public/media/summer-festival/cover-wide-v1.png`
- 構図：上段に昴の笑顔のアップ、下段に元の5人を左から同じ順番で配置した極端な顔アップ。
- 生成方法：組み込みの `image_gen` による描き直し。
- 参照：提供サムネイル `cover.png` と昴の顔が見える `subaru-2.png`。
- 生成プロンプト：`production/summer-festival/cover-redraw-prompt-v1.txt`
- 生成元：`/Users/guarhiro/.codex/generated_images/01a085a2-88d5-7ee3-8930-815591abb580/exec-294e19cd-e812-493a-a55b-f001e8dfeb32.png`
- 検品：生成画像を直接確認し、上段1人・下段5人、並び順、顔の大きさ、横長構図を確認。
- 文字は既存の作品カード上で作品名・製作者名を表示する。作品紹介ページは提供された元の縦長サムネイルを使用。

## BGM

- 曲名：End-of-Summer Warmth
- 提供元：`/Users/guarhiro/Downloads/End-of-Summer Warmth.m4a`
- サイト用音源：`public/media/summer-festival/end-of-summer-warmth.mp3`
- 約1分22秒、48 kHz、ステレオ。提供音源からMP3を作成し、全編デコードを確認。
- 作品19の一覧・ギャラリーと `/summer-festival/` に同じ曲を設定。
- 既存の操作による再生・停止、曲切り替え、ループ設定を使用。

## 確認記録

ページ生成、既存テスト10件、lintが成功。出力されたHTMLで、一覧とギャラリーの新しい表紙、作品19の曲選択、紹介ページの曲名・音源URL・ループ設定・自動再生なしを確認。画像とMP3はサイトへの出力前後で一致。紹介ページの元の表紙、提供画像、既存の別作品のファイルは保持。この記録は公開前の確認結果。
