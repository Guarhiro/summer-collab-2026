import type { Metadata, Viewport } from "next";
import BgmProvider from "./BgmProvider";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const rscContentTypeBridge = `
(() => {
  const script = document.currentScript;
  const basePath = script?.dataset.basePath || "";
  if (!basePath || window.__summerCollabRscBridgeInstalled) return;

  window.__summerCollabRscBridgeInstalled = true;
  const nativeFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    const response = await nativeFetch(input, init);
    if (!response.ok) return response;

    let requestUrl;
    try {
      const value =
        typeof input === "string"
          ? input
          : input instanceof URL
            ? input.href
            : input.url;
      requestUrl = new URL(value, window.location.href);
    } catch {
      return response;
    }

    const contentType = response.headers.get("content-type")?.split(";", 1)[0];
    const isGitHubPagesRsc =
      requestUrl.origin === window.location.origin &&
      requestUrl.pathname.startsWith(basePath + "/") &&
      requestUrl.pathname.endsWith(".rsc") &&
      contentType === "application/octet-stream";

    if (!isGitHubPagesRsc) return response;

    const headers = new Headers(response.headers);
    headers.set("content-type", "text/x-component");

    return new Proxy(response, {
      get(target, property) {
        if (property === "headers") return headers;
        const value = Reflect.get(target, property, target);
        return typeof value === "function" ? value.bind(target) : value;
      },
    });
  };
})();
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "あの夏を、もう一度。｜SUMMER COLLAB 2026",
  description:
    "ひとつの季節から生まれた五つの物語を、映像とスクロールでめぐるコラボレーション展。",
  icons: {
    icon: `${basePath}/favicon.png`,
    shortcut: `${basePath}/favicon.png`,
  },
  openGraph: {
    title: "あの夏を、もう一度。｜SUMMER COLLAB 2026",
    description:
      "映像とスクロールで五つの夏をめぐる、コラボレーション展。",
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
    description: "映像とスクロールで五つの夏をめぐるコラボレーション展。",
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
      <head>
        <script
          data-rsc-content-type-bridge
          data-base-path={basePath}
          dangerouslySetInnerHTML={{ __html: rscContentTypeBridge }}
        />
      </head>
      <body>
        <BgmProvider>{children}</BgmProvider>
      </body>
    </html>
  );
}
