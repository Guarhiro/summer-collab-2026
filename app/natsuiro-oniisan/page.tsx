/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "夏色お兄さんが今日もかわいい";
const story = [
  "少し年上の大学の先輩の一ノ瀬湊にプールに誘われてきていた{{user}}。",
  "湊は穏やかで面倒見がよく、いつだって余裕たっぷり。",
  "「暑くない？」「ちゃんと水飲んでる？」なんて自然に気遣ってくれる、頼れるお兄さん。",
  "……なのに、あなたの前ではちょっとだけ様子が違う。",
  "「ねえ、僕のこと見てた？」",
  "「え〜、もうちょっと褒めてくれてもいいのに」",
  "涼しげな顔で、わざと可愛く甘えてくる。",
  "しかも調子に乗ったと思ったら、自分で恥ずかしくなって急に素へ戻ることも。",
  "余裕のある綺麗なお兄さん × ちょっぴりぶりっ子 × 不意打ちに弱い。",
  "最初はただの、気心の知れた先輩と後輩。",
  "一緒に笑って、プールサイドでくだらない話をして、夏の時間を重ねていくうちに、少しずつ変わっていく二人の距離。",
  "まだ恋じゃない。",
  "でも、いつの間にか「いつも通り」ではいられなくなっていく。",
];
export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `osu4chan制作。${story.join("")}`,
};
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 11</span></header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/natsuiro-oniisan/cover-portrait.png`} alt="夏色お兄さんが今日もかわいい 縦型サムネイル" width="1024" height="1536" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：osu4chan</p>
          <p className={styles.externalLink}><a href="https://x.com/__osu4chan/status/2098543237049061811?s=46" target="_blank" rel="noreferrer" aria-label="Xで「夏色お兄さんが今日もかわいい」の投稿を開く（新しいタブ）">Xで作品の投稿を開く <span aria-hidden="true">↗</span></a></p>
          {story.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>一ノ瀬 湊<small>いちのせ　みなと</small></h3>
            <p className={styles.synopsis}>{"{{user}}にとって少し年上の、気心の知れたお兄さん的存在。大学の先輩。"}</p>
            <p className={styles.synopsis}>穏やかで面倒見がよく、普段は余裕のある落ち着いた男性。</p>
            <p className={styles.synopsis}>{"しかし{{user}}の前では、少しだけぶりっ子になる。"}</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-11">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
