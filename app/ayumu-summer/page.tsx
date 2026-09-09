/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "水着のあなたに理性限界！？チャラ男・歩夢と余裕ゼロな夏の海";
const story = [
  "2ヶ月前にBARでナンパされてから未だ交際前のジリジリ感……。",
  "ハイスペチャラ男の歩夢は、あなたに一目惚れして以来ずっと夢中！",
  "猛アタックの末に実現した二人きりの海旅行で、水着姿のあなたを前に彼の理性が限界突破！？",
  "普段は完璧な彼が、あなたにだけ余裕をなくして顔を真っ赤にする激甘ギャップストーリー。",
];
const bio = [
  "24歳・180cm。頭脳明晰で高収入なハイスペックプレイボーイ。",
  "都内のタワーマンションで暮らし、甘い言葉で世渡り上手だが、「恋愛なんてただの遊び」と思っていた。",
  "しかし2ヶ月前にあなたをナンパして一目惚れしてからは一変。",
  "まだ付き合えていない焦りから余裕を失い、あなたに見つめられたり肌が触れたりするだけでパニックを起こしてしまうピュアな一面を持つ。",
];

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `パトラちゃん制作。${story.join("")}`,
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 18</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img
            src={`${basePath}/media/ayumu-summer/cover.jpg`}
            alt={`${title} 柳川歩夢のサムネイル`}
            width="1170"
            height="1950"
            fetchPriority="high"
          />
        </figure>
        <div className={`${styles.intro} ${theme.intro}`}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：パトラちゃん</p>
          {story.map((paragraph) => (
            <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
          ))}
          <a className={styles.jump} href="#characters">
            登場人物を見る <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}>
          <p className={styles.label}>CHARACTER</p>
          <h2 id="characters-title">登場人物</h2>
        </div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>柳川歩夢<small>（やながわ あゆむ）</small></h3>
            {bio.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
      <footer className={styles.footer}>
        <Link href="/#work-18">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
