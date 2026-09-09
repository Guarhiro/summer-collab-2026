/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "肝試されてるのお前じゃん！";
const story = [
  "夏の夜、友人たちと肝試しに訪れた古びた廃校。",
  "そこで出会ったのは、人間を怖がらせることに妙な情熱を燃やす一人の幽霊だった。",
  "脅かして、失敗して、なぜか自分までビビってる。",
  "そんなポンコツ幽霊と真夜中の校内を巡る、ちょっぴりホラーで騒がしい肝試しコメディ！",
  "けれど探索を続けるうち、いつも騒がしい彼がなぜか音楽室だけは避けたがることに気づいて――。",
];
const bio = [
  "廃校に居ついている18歳の幽霊。",
  "陽気なお調子者で、人間を驚かせることが大好き。幽霊としてのプライドはやたら高いものの、出現場所を間違えたり、自分で起こした怪奇現象に驚いたりと肝心なところでポンコツ。",
];

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: story.join(" "),
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={`${styles.header} ${theme.header}`}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 17</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={`${styles.cover} ${theme.cover}`}>
          <img
            src={`${basePath}/media/kimodameshi/cover.png`}
            alt="肝試されてるのお前じゃん！ 榎戸 調のサムネイル"
            width="1024"
            height="1536"
            fetchPriority="high"
          />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          {story.map((paragraph) => (
            <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
          ))}
          <a className={styles.jump} href="#characters">
            登場人物を見る <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={`${styles.sectionHeading} ${theme.sectionHeading}`}>
          <p className={styles.label}>CHARACTER</p>
          <h2 id="characters-title">登場人物</h2>
        </div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>榎戸 調<small>えのきど しらべ</small></h3>
            {bio.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
      <footer className={`${styles.footer} ${theme.footer}`}>
        <Link href="/#work-17">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
