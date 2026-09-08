"use client";
/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default function Portraits({ id, name }: { id: string; name: string }) {
  const [selected, setSelected] = useState(1);
  const image = (number: number) => `${basePath}/media/lepus/${id}-${number}.${id === "rin" && number === 2 ? "webp" : "png"}`;
  return (
    <div className={styles.portraits}>
      <img id={`${id}-portrait`} className={`${styles.portrait} ${theme.portrait}`} src={image(selected)} width="1024" height="1024" alt={`${name}のイラスト ${selected}`} loading="lazy" />
      <div className={styles.choices} aria-label={`${name}の画像切り替え`}>
        {[1, 2].map(number => <button type="button" key={number} aria-pressed={selected === number} aria-controls={`${id}-portrait`} aria-label={`${name}の画像${number}を表示`} onClick={() => setSelected(number)} onMouseEnter={() => setSelected(number)} onFocus={() => setSelected(number)}><img src={image(number)} alt="" width="60" height="60" loading="lazy" /><span>0{number}</span></button>)}
      </div>
    </div>
  );
}
