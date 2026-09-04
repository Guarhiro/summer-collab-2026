import type { Metadata } from "next";
import CharacterGallery from "./CharacterGallery";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "恋の航海 ~Voyage on the Eternal Blue~｜SUMMER COLLAB 2026",
  description:
    "豪華クルーズ船に集まった12人を紹介。13人目のあなたが、恋と嘘を見抜く7日間。",
  openGraph: {
    title: "恋の航海 ~Voyage on the Eternal Blue~",
    description: "13人目のあなたが恋と嘘を見抜く7日間。",
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: `${basePath}/media/koi-no-voyage/cover-card.jpg`,
        width: 1600,
        height: 900,
        alt: "豪華客船の前に集まった恋の航海の12人",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "恋の航海 ~Voyage on the Eternal Blue~",
    description: "13人目のあなたが恋と嘘を見抜く7日間。",
    images: [`${basePath}/media/koi-no-voyage/cover-card.jpg`],
  },
};

export default function KoiNoKoukaiPage() {
  return <CharacterGallery />;
}
