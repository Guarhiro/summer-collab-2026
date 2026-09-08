"use client";
/* eslint-disable @next/next/no-img-element -- Preserve the supplied portrait images. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portraits() {
  const id = "hiiragi";
  const name = "月城 柊";
  const [selected, setSelected] = useState(1);
  return (
    <div className={styles.portraits}>
      <img id={`${id}-portrait`} className={styles.portrait} src={`${basePath}/media/everlasting-summer-night/${id}-${selected}.jpg`} width="1536" height="2560" alt={`${name}のイラスト ${selected}`} loading="lazy" />
      <div className={styles.choices} aria-label={`${name}の画像切り替え`}>
        {[1, 2].map((number) => (
          <button type="button" key={number} aria-pressed={selected === number} aria-controls={`${id}-portrait`} aria-label={`${name}の画像${number}を表示`} onClick={() => setSelected(number)}>
            <img src={`${basePath}/media/everlasting-summer-night/${id}-${number}.jpg`} alt="" width="60" height="100" loading="lazy" /><span>0{number}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
