/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "夏に恋した吸血鬼";
export const metadata: Metadata = { title: `${title}｜SUMMER COLLAB 2026`, description: "ミネス14世制作。現存する最後の吸血鬼と過ごす、ひと夏の恋物語。" };
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 07</span></header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/summer-vampire/cover.jpg`} alt="夏に恋した吸血鬼 瀬野燈李のサムネイル" width="1152" height="1728" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">夏に恋した<span>吸血鬼</span></h1>
          <p className={theme.credit}>製作者：ミネス14世</p>
          <p className={styles.synopsis}>現存する最後の吸血鬼と過ごす、ひと夏の恋物語。 太陽を60分だけ克服できる秘薬「蒼月の雫」を完成させた燈李は、何百年も憧れていた夏の海へ。そこで偶然出会ったあなたを軽いノリでナンパする。 海、ラムネ、夏祭り、花火⋯初めての夏を一緒に過ごすうち、ただの遊び相手だった二人の関係が少しずつ変わっていく。</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>瀬野燈李<small>せのとうり</small></h3>
            <p>数百年以上生きる、現存する最後の吸血鬼。総合病院に勤務する超陽キャで、人懐っこく距離感も近め。チャラく見えるが、困っている人を放っておけない優しい性格。 長い年月を孤独に生きながらも人間を愛し、人間社会に溶け込んで暮らしている。</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-07">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
