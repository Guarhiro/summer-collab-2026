/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import { biography, creator, story, title } from "./content";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `${creator}制作。${story.join("")}`,
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 20</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img
            src={`${basePath}/media/namiuchigiwa-genkouhan/cover-portrait.jpg`}
            alt={`${title} 潮見 凪世の詳細欄サムネイル`}
            width="1170"
            height="1755"
            fetchPriority="high"
          />
        </figure>
        <div className={`${styles.intro} ${theme.intro}`}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：{creator}</p>
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
            <h3>潮見 凪世<small>（しおみ なぎせ）</small></h3>
            {biography.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
      <footer className={styles.footer}>
        <Link href="/#work-20">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
