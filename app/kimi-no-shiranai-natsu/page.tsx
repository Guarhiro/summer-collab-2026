/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "きみの知らない夏がある";
const story = [
  "7月18日の海開きの日、海へ遊びに来た{{user}}は、海の家「SUNNY」で働く蒼凪陽と出会う。",
  "明るく人懐っこい陽に気に入られ、海水浴や海の家での手伝い、夏祭り、花火大会などを一緒に楽しみながら、45日間の夏を過ごしていく。",
  "楽しくて、少し特別で、いつまでも覚えていたくなるような夏。",
  "しかし、8月31日の海じまいを迎えると、陽との夏には不思議な変化が訪れる。",
  "この夏、陽と最高の思い出を作ろう。",
];
const bio = [
  "フレンドリーで人懐っこく初対面にも気軽に話しかける。明るく前向きで、夏そのものを心から楽しんでいる。冗談や軽口も多いが悪意はない。",
  "友人は多いものの、本当に心を許した相手には弱さや本音を見せる。",
];
export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `さかなししゃも制作。${story[0]}`,
};
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 09</span></header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/kimi-no-shiranai-natsu/cover.png`} alt="きみの知らない夏がある 蒼凪 陽のサムネイル" width="1024" height="1536" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：さかなししゃも</p>
          {story.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          <blockquote>蠖ｼ縺ｯ螟上′邨ゅｏ繧九→豸医∴繧?</blockquote>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>蒼凪 陽<small>あおなぎ はる</small></h3>
            {bio.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-09">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
