"use client";

/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraits = [
  { number: 1, alt: "海辺でドリンクを手にする柳川歩夢" },
  { number: 2, alt: "夜の海辺で手を差し伸べる柳川歩夢" },
  { number: 3, alt: "夏の海でサングラスに手を添える柳川歩夢" },
] as const;
const image = (number: number) => `${basePath}/media/ayumu-summer/ayumu-${number}.jpg`;

export default function Portraits() {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.portraits}>
      <img
        id="ayumu-portrait"
        className={styles.portrait}
        src={image(portraits[selected].number)}
        width="768"
        height="1280"
        alt={portraits[selected].alt}
        loading="lazy"
      />
      <div className={`${styles.choices} ${theme.choices}`} aria-label="柳川歩夢の画像切り替え">
        {portraits.map((portrait, index) => (
          <button
            type="button"
            key={portrait.number}
            aria-pressed={selected === index}
            aria-controls="ayumu-portrait"
            aria-label={`柳川歩夢の画像${portrait.number}を表示`}
            onPointerEnter={() => setSelected(index)}
            onFocus={() => setSelected(index)}
            onClick={() => setSelected(index)}
          >
            <img src={image(portrait.number)} alt="" width="42" height="70" loading="lazy" />
            <span>0{portrait.number}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
