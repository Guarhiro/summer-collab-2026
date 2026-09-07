/* eslint-disable @next/next/no-img-element -- Preserve supplied images on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "最推しと夏祭りデートなんだが？！";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: "売れっ子アイドルの{{user}}。親が再婚して{{user}}の隠れオタク、天城 寧（あまぎ ねい）が義兄に…。それから数ヶ月経った頃、休みが取れた二人は夏祭りに出かけることに！？",
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 03</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/saioshi-natsumatsuri/cover.png`} alt={`${title} 天城 寧のサムネイル`} width="1024" height="1536" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">最推しと<span>夏祭りデート</span>なんだが？！</h1>
          <p className={styles.label}>製作者：くいっく</p>
          <p className={styles.synopsis}>売れっ子アイドルの{'{{user}}'}。親が再婚して{'{{user}}'}の隠れオタク、天城 寧（あまぎ ねい）が義兄に…。</p>
          <p className={styles.synopsis}>それから数ヶ月経った頃、休みが取れた二人は夏祭りに出かけることに！？</p>
          <h2 className={theme.catchphrase}>寧の心と理性はどうなっちゃうの！？</h2>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits id="nei" name="天城 寧" />
          <div className={styles.bio}>
            <p className={styles.label}>キャラ紹介</p>
            <h3>天城 寧<small>あまぎ ねい</small></h3>
            <p>一見爽やかなお兄さんだが、理性がログアウトしている{'{{user}}'}の重度オタク。{'{{user}}'}が新人の頃から推していた古参勢。普段は冷静で落ち着きがあり常識人。寧本人はオタクと言うことを{'{{user}}'}から隠しているつもりだが、{'{{user}}'}を前にすると全理性消失からの思考が声に漏れてしまったり、感情が顔に出すぎてしまったりと全然隠せていない。理性を保とうとする程壊れるタイプである。</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-03">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
