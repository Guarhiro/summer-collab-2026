# SUMMER COLLAB 2026

背景映像とスクロール演出で五つのコラボ作品をめぐり、
『恋の航海』では12人の登場人物を選んで紹介を読めるサイトです。

## ローカル確認

```bash
npm ci
npm run dev
```

## 内容の差し替え

作品名・作者名・説明文・リンク先は `app/page.tsx` の `projects` から変更できます。作品画像は `public/media` に置き、同じ配列の `image` を更新してください。

## 公開

`main` ブランチへのpushで GitHub Actions が静的サイトを生成し、GitHub Pagesへ公開します。初回だけリポジトリの Settings → Pages で公開元を `GitHub Actions` に設定します。
