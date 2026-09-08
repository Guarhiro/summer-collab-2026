"use client";
/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const image = (number: number) => `${basePath}/media/kimi-no-shiranai-natsu/haru-${number}.${number <= 2 ? "jpg" : "png"}`;
export default function Portraits() {
  const [selected, setSelected] = useState(1);
  return (
    <div className={styles.portraits}>
      <img id="haru-portrait" className={`${styles.portrait} ${theme.portrait}`} src={image(selected)} width="1472" height="2816" alt={`蒼凪 陽のイラスト ${selected}`} loading="lazy" />
      <div className={`${styles.choices} ${theme.choices}`} aria-label="蒼凪 陽の画像切り替え">
        {[1, 2, 3, 4].map(number => <button type="button" key={number} aria-pressed={selected === number} aria-controls="haru-portrait" aria-label={`蒼凪 陽の画像${number}を表示`} onClick={() => setSelected(number)}><img src={image(number)} alt="" width="60" height="80" loading="lazy" /><span>0{number}</span></button>)}
      </div>
    </div>
  );
}
