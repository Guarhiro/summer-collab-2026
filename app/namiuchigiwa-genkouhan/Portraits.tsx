"use client";

/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraits = [
  { number: 1, alt: "海辺でホイッスルをくわえる潮見 凪世" },
  { number: 2, alt: "海辺で口元に手を添える潮見 凪世" },
] as const;
const image = (number: number) => `${basePath}/media/namiuchigiwa-genkouhan/nagise-${number}.png`;

export default function Portraits() {
  const [selected, setSelected] = useState(0);

  return (
    <div className={styles.portraits}>
      <img
        id="nagise-portrait"
        className={styles.portrait}
        src={image(portraits[selected].number)}
        width="768"
        height="1280"
        alt={portraits[selected].alt}
        loading="lazy"
      />
      <div className={`${styles.choices} ${theme.choices}`} aria-label="潮見 凪世の画像切り替え">
        {portraits.map((portrait, index) => (
          <button
            type="button"
            key={portrait.number}
            aria-pressed={selected === index}
            aria-controls="nagise-portrait"
            aria-label={`潮見 凪世の画像${portrait.number}を表示`}
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
