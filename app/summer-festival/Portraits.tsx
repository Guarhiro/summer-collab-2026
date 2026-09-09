"use client";

/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraits = [
  { number: 1, width: 1024, height: 1536, alt: "フェス会場の入口で振り返り、手を差し伸べる昴" },
  { number: 2, width: 1024, height: 1536, alt: "青いヘッドホンを首に掛け、近い距離で笑う昴" },
  { number: 3, width: 1374, height: 1145, alt: "フェス会場で仲間二人と並んで笑う昴" },
] as const;
const image = (number: number) => `${basePath}/media/summer-festival/subaru-${number}.png`;

export default function Portraits() {
  const [selected, setSelected] = useState(0);
  const portrait = portraits[selected];

  return (
    <div className={styles.portraits}>
      <img
        id="subaru-portrait"
        className={`${styles.portrait} ${theme.portrait}`}
        src={image(portrait.number)}
        width={portrait.width}
        height={portrait.height}
        alt={portrait.alt}
        loading="lazy"
      />
      <div className={`${styles.choices} ${theme.choices}`} aria-label="昴の画像切り替え">
        {portraits.map((choice, index) => (
          <button
            type="button"
            key={choice.number}
            aria-pressed={selected === index}
            aria-controls="subaru-portrait"
            aria-label={`昴の画像${choice.number}を表示`}
            onPointerEnter={() => setSelected(index)}
            onFocus={() => setSelected(index)}
            onClick={() => setSelected(index)}
          >
            <img src={image(choice.number)} alt="" width="42" height="63" loading="lazy" />
            <span>0{choice.number}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
