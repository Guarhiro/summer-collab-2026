"use client";
/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const image = (number: number) => `${basePath}/media/koimiman/haruki-${number}.png`;
export default function Portraits() {
  const [selected, setSelected] = useState(1);
  return (
    <div className={styles.portraits}>
      <img id="haruki-portrait" className={`${styles.portrait} ${theme.portrait}`} src={image(selected)} width="1024" height="1430" alt={`津田 晴輝のイラスト ${selected}`} loading="lazy" />
      <div className={`${styles.choices} ${theme.choices}`} aria-label="津田 晴輝の画像切り替え">
        {[1, 2, 3].map(number => <button type="button" key={number} aria-pressed={selected === number} aria-controls="haruki-portrait" aria-label={`津田 晴輝の画像${number}を表示`} onClick={() => setSelected(number)}><img src={image(number)} alt="" width="60" height="80" loading="lazy" /><span>0{number}</span></button>)}
      </div>
    </div>
  );
}
