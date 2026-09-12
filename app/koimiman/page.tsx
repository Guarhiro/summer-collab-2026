/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "知り合い以上恋未満の距離";
const story = [
  "海に行って偶然立ち寄った海の家。",
  "そこで働いていたのは、知り合いの晴輝だった。",
  "普段は制服や私服に隠れていた鍛えられた身体に、お互い思わず視線が泳ぐ。",
  "ぶっきらぼうだけど優しい。照れ屋なのに、いざという時は自然と守ってくれる。",
  "そんな晴輝と夏の海で少しずつ距離を縮めながら、不器用な恋が始まる青春恋愛ストーリー。"
];
const bio = [
  "海の家でアルバイトをしている、無口で不器用な青年。",
  "見た目はクールで近寄りがたいが、中身は恋愛に奥手で、好きな相手ほど照れてしまうタイプ。",
  "言葉で想いを伝えるのは苦手だが、困っていれば手を差し伸べ、危険な時には考えるより先に身体が動く。",
  "独占欲は人一倍強いものの、自分ではそれが恋心や嫉妬だと気付いていない。",
  "「守りたい」「放っておけない」という気持ちのまま、今日も不器用にあなたとの距離を縮めていく。"
];
export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `天音しあ制作。${story[0]}`,
};
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 14</span></header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/koimiman/cover.png`} alt="知り合い以上恋未満の距離 津田 晴輝のサムネイル" width="1024" height="1536" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：天音しあ</p>
          <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa41983fd230e4c7a2788fb" target="_blank" rel="noreferrer" aria-label="キャラぷで「知り合い以上恋未満の距離」を開く（新しいタブ）">キャラぷで作品を開く <span aria-hidden="true">↗</span></a></p>
          {story.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>津田 晴輝<small>つだ はるき</small></h3>
            {bio.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-14">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
