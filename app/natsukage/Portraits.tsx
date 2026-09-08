"use client";
/* eslint-disable @next/next/no-img-element -- Preserve supplied portraits. */
import { useState } from "react";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default function Portraits({ id, name }: { id: "mio" | "hotaru"; name: string }) {
  const [selected, setSelected] = useState(1);
  const image = (number: number) => `${basePath}/media/natsukage/${id}-${number}.png`;
  return (
    <div className={styles.portraits}>
      <img id={`${id}-portrait`} className={styles.portrait} src={image(selected)} width="972" height="1620" alt={`${name}（${selected === 1 ? "通常衣装" : "浴衣"}）`} loading="lazy" />
      <div className={`${styles.choices} ${theme.choices}`} aria-label={`${name}の画像切り替え`}>
        {[1, 2].map(number => <button type="button" key={number} aria-pressed={selected === number} aria-controls={`${id}-portrait`} aria-label={`${name}の${number === 1 ? "通常衣装" : "浴衣"}を表示`} onClick={() => setSelected(number)}><img src={image(number)} alt="" width="60" height="100" loading="lazy" /><span>{number === 1 ? "通常衣装" : "浴衣"}</span></button>)}
      </div>
    </div>
  );
}
