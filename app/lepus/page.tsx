/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "Lepusバニーボーイ専門店出張篇";
const introduction = "いつものLepusが夏だけ南国リゾートへ。海辺の開放的な空間で、個性豊かなバニーボーイたちがお客様をお迎えします。";
export const metadata: Metadata = { title: `${title}｜SUMMER COLLAB 2026`, description: introduction };
const characters = [
  { id: "ai", name: "アイ", description: "Lepus No.1エース。小悪魔系の愛嬌と抜群の接客力で魅了する看板バニー。" },
  { id: "rin", name: "凛", description: "Lepus No.2・最古参。落ち着いた丁寧な接客が魅力の、上品で綺麗系のバニー。" },
  { id: "yuki", name: "雪", description: "Lepus No.3。明るく親しみやすく、あざとい魅力で自然に距離を縮める人気バニー。" },
  { id: "hyoga", name: "氷牙", description: "夏季限定の特別助っ人。クールな実力派で、夏のイベントでも活躍するバニー。" },
];
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 06</span></header>
      <section className={theme.hero} aria-labelledby="story-title">
        <figure className={theme.cover}><img src={`${basePath}/media/lepus/cover-wide-v1.png`} alt="アイ・凛・雪・氷牙、海辺に集まった4人のバニーボーイ" width="1672" height="941" fetchPriority="high" /></figure>
        <div className={`${styles.intro} ${theme.intro}`}>
          <img className={theme.logo} src={`${basePath}/media/lepus/logo.png`} alt="Lepus Beach Resort" width="1536" height="1024" />
          <p className={styles.label}>作品紹介</p><h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：純粋なヒヨコ86637</p>
          <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa41942343da5a6fa2af683" target="_blank" rel="noreferrer" aria-label="キャラぷで「Lepusバニーボーイ専門店出張篇」を開く（新しいタブ）">キャラぷで作品を開く <span aria-hidden="true">↗</span></a></p>
          <blockquote>Lepus Beach Resort ― この夏だけの、海辺の特別営業 ―</blockquote>
          <p className={styles.synopsis}>{introduction}</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
        <figure className={theme.resort}><img src={`${basePath}/media/lepus/resort.png`} alt="海に面したLepus Beach Resortの外観" width="1536" height="1024" loading="lazy" /></figure>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTERS</p><h2 id="characters-title">登場人物</h2></div>
        {characters.map((character, index) => (
          <article key={character.id} className={`${styles.character} ${index % 2 ? styles.oto : ""}`}>
            <Portraits id={character.id} name={character.name} />
            <div className={styles.bio}><p className={styles.label}>0{index + 1}</p><h3>{character.name}</h3><p>{character.description}</p></div>
          </article>
        ))}
      </section>
      <footer className={styles.footer}><Link href="/#work-06">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
