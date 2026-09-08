"use client";
/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraits = [
  { file: "jin-1.jpg", width: 1280, height: 848 },
  { file: "jin-2.jpg", width: 1280, height: 848 },
  { file: "jin-3.jpg", width: 960, height: 1280 },
  { file: "jin-4.webp", width: 768, height: 1280 },
  { file: "jin-5.jpg", width: 848, height: 1280 },
];
export default function Portraits() {
  const [selected, setSelected] = useState(0);
  const portrait = portraits[selected];
  return <div className={styles.portraits}>
    <img id="jin-portrait" className={`${styles.portrait} ${theme.portrait}`} src={`${basePath}/media/gachimuchi-paisen/${portrait.file}`} width={portrait.width} height={portrait.height} alt={`神城 仁のイラスト ${selected + 1}`} loading="lazy" />
    <div className={`${styles.choices} ${theme.choices}`} aria-label="神城 仁の画像切り替え">
      {portraits.map((item, index) => <button type="button" key={item.file} aria-pressed={selected === index} aria-controls="jin-portrait" aria-label={`神城 仁の画像${index + 1}を表示`} onClick={() => setSelected(index)}>
        <img src={`${basePath}/media/gachimuchi-paisen/${item.file}`} alt="" width="42" height="56" loading="lazy" /><span>0{index + 1}</span>
      </button>)}
    </div>
  </div>;
}
