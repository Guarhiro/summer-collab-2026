/* eslint-disable @next/next/no-img-element -- Supplied images are served by static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import styles from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "笑顔で牽制し合うのやめて";
const introduction = "夏のアトラスオーシャンで開催される謎イベント「筋肉祭り」。 悪ノリ大好きな先輩・海衣と、真面目で素直な後輩・元気。 爽やかな夏の三角関係に見えて、二人とも{{user}}への感情だけはとんでもなく重い。 笑顔で牽制する先輩と、真正面から譲らない後輩による、激重執着＆独占欲バトル。";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: introduction,
  openGraph: {
    title, description: introduction,
    images: [{ url: `${basePath}/media/egao-kensei/cover.png`, width: 1024, height: 1536, alt: title }],
    locale: "ja_JP", type: "website",
  },
};

export default function StoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 12</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/egao-kensei/cover.png`} alt={`${title} 海衣と元気`} width="1024" height="1536" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">笑顔で<span>牽制し合うの</span>やめて</h1>
          <p className={styles.label}>製作者：ポメるんるん</p>
          <p className={styles.synopsis}>{introduction}</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTERS</p><h2 id="characters-title">海衣（カイ）＆元気(ゲンキ)</h2></div>
        <article className={styles.character}>
          <div className={styles.portraits}><img className={styles.portrait} src={`${basePath}/media/egao-kensei/kai.png`} alt="海衣(金髪)" width="1200" height="1800" loading="lazy" /></div>
          <div className={styles.bio}>
            <h3>海衣<small>カイ</small></h3>
            <p>{"28歳。ライフセーバー歴約10年のベテラン。 真面目に不真面目を貫き、からかい・煽り・悪ノリ・屁理屈が大好物。 いつも飄々と笑っているが、{{user}}への執着と独占欲はかなり深い。"}</p>
          </div>
        </article>
        <article className={`${styles.character} ${styles.genki}`}>
          <div className={styles.portraits}><img className={styles.portrait} src={`${basePath}/media/egao-kensei/genki.png`} alt="元気(赤髪)" width="1194" height="1800" loading="lazy" /></div>
          <div className={styles.bio}>
            <h3>元気<small>ゲンキ</small></h3>
            <p>{"海衣の後輩ライフセーバー。 鍛えた身体に自信を持つ、真面目で素直な好青年。 海衣の悪ノリに振り回されがちだが、{{user}}への想いだけは重く、先輩相手でも一歩も譲らない。"}</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-12">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
