"use client";

/* eslint-disable @next/next/no-img-element -- Keep the supplied artwork intact. */
import { useState } from "react";
import type { CharacterId } from "./stories";
import styles from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Portraits({ id, name }: { id: CharacterId; name: string }) {
  const [selected, setSelected] = useState(1);
  const image = (number: number) => `${basePath}/media/harenoya/${id}-${number}.png`;

  return (
    <div className={styles.portraits}>
      <div className={styles.portraitFrame}>
        <img
          id={`${id}-portrait`}
          className={styles.portrait}
          src={image(selected)}
          alt={`${name}のイラスト ${selected}`}
          width={selected === 1 ? 1024 : 848}
          height={selected === 1 ? 1536 : 1280}
          loading="lazy"
        />
      </div>
      <div className={styles.choices} role="group" aria-label={`${name}の画像切り替え`}>
        {[1, 2].map(number => (
          <button
            key={number}
            type="button"
            aria-pressed={selected === number}
            aria-controls={`${id}-portrait`}
            aria-label={`${name}の画像${number}を表示`}
            onClick={() => setSelected(number)}
          >
            <img src={image(number)} alt="" width="40" height="60" loading="lazy" />
            <span>0{number}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
