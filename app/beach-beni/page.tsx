/* eslint-disable @next/next/no-img-element -- Preserve supplied images on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "ビーチでも紅に飾って！";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: "くいっく制作。束の間の休息を求めてビーチへとやってきた馬島 昴。この馬なんか変だぞ…？",
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 02</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/beach-beni/cover.png`} alt="ビーチでも紅に飾って！ 馬島 昴のサムネイル" width="1024" height="1536" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">ビーチでも<span>紅に</span>飾って！</h1>
          <p className={theme.credit}>製作者：くいっく</p>
          <p className={styles.synopsis}>ブラウンの長髪を一つに束ね、黄色い瞳、馬の耳と尾を持つ男＿＿馬島 昴は束の間の休息を求めてビーチへとやってきた。</p>
          <p className={styles.synopsis}>同じく休息を求めていた{'{{user}}'}は彼とばったり会い、なんとなく彼とご一緒することに…</p>
          <h2 className={theme.catchphrase}>この馬なんか変だぞ…？</h2>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits id="subaru" name="馬島 昴" />
          <div className={styles.bio}>
            <p className={styles.label}>元人気モデル</p>
            <h3>馬島 昴<small>まじま すばる</small></h3>
            <p>元人気モデル。紳士で無駄のないスーパーダーリン。穏やかで落ち着きのある雰囲気があるが、実はプレッシャーに弱く、周りからの期待を受けることが苦手。時々子供らしい表情や態度を見せることも。少し特殊な性癖をもっていて…？</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-02">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
