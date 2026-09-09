"use client";

/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const portraits = [
  { file: "shirabe-3.webp", width: 1280, height: 720, label: "03", alt: "夜の廃校の廊下でこちらを見る榎戸 調" },
  { file: "shirabe-2.png", width: 690, height: 774, label: "02", alt: "背後の幽霊に気づき、自分も驚いてしまう榎戸 調の二コマイラスト" },
  { file: "shirabe-1.png", width: 941, height: 1672, label: "01", alt: "幽霊たちのいる廊下で、両手を頬に当てて叫ぶ榎戸 調" },
];

export default function Portraits() {
  const [selected, setSelected] = useState(0);
  const portrait = portraits[selected];

  return (
    <div className={styles.portraits}>
      <img
        id="shirabe-portrait"
        className={`${styles.portrait} ${theme.portrait}`}
        src={`${basePath}/media/kimodameshi/${portrait.file}`}
        width={portrait.width}
        height={portrait.height}
        alt={portrait.alt}
        loading="lazy"
      />
      <div className={`${styles.choices} ${theme.choices}`} role="group" aria-label="榎戸 調の画像切り替え">
        {portraits.map((item, index) => (
          <button
            type="button"
            key={item.file}
            aria-pressed={selected === index}
            aria-controls="shirabe-portrait"
            aria-label={`榎戸 調の画像${item.label}を表示`}
            onClick={() => setSelected(index)}
          >
            <img src={`${basePath}/media/kimodameshi/${item.file}`} alt="" width="60" height="60" loading="lazy" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
