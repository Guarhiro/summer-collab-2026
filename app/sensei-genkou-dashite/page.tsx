/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import { biography, creator, story, title } from "./content";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `製作者：${creator}。${story.join("")}`,
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 21</span>
      </header>

      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={`${styles.cover} ${theme.cover}`}>
          <img
            src={`${basePath}/media/sensei-genkou-dashite/thumbnail.webp`}
            alt={`${title} ベルフェゴールの文字入りサムネイル`}
            width="768"
            height="1152"
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
        </div>
      </section>

      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}>
          <p className={styles.label}>CHARACTER</p>
          <h2 id="characters-title">登場人物</h2>
        </div>
        <article className={styles.character}>
          <figure className={`${styles.portraits} ${theme.portraits}`}>
            <img
              className={`${styles.portrait} ${theme.portrait}`}
              src={`${basePath}/media/sensei-genkou-dashite/cover.webp`}
              alt="机に向かい、こちらへ微笑むベルフェゴール"
              width="768"
              height="1280"
              loading="lazy"
            />
          </figure>
          <div className={styles.bio}>
            <h3>ベルフェゴール</h3>
            {biography.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>

      <footer className={styles.footer}>
        <Link href="/#work-21">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
