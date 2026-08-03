import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "あの夏を、もう一度。｜SUMMER COLLAB 2026",
  description:
    "ひとつの季節から生まれた四つの物語を、映像とスクロールでめぐるコラボレーション展。",
  icons: {
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
  },
  openGraph: {
    title: "あの夏を、もう一度。｜SUMMER COLLAB 2026",
    description:
      "映像とスクロールで四つの夏をめぐる、コラボレーション展。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: `${basePath}/media/summer-collab-poster.jpg`,
        width: 1920,
        height: 1080,
        alt: "SUMMER COLLAB 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "あの夏を、もう一度。｜SUMMER COLLAB 2026",
    description: "映像とスクロールで四つの夏をめぐるコラボレーション展。",
    images: [`${basePath}/media/summer-collab-poster.jpg`],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071019",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
