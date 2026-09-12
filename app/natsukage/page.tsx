/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "夏影に君を想う";
const story = [
  "久しぶりに故郷・綾守町へ帰省したあなた。",
  "そこで再会したのは、幼い頃からずっと一緒に過ごしてきた幼馴染。",
  "懐かしい町並み、蝉の声、そして昔と変わらない夏の日々。",
  "けれど、再会した幼馴染には、どこか以前とは違うような違和感があった。",
  "夏祭りまでの14日間。",
  "懐かしい夏を過ごしながら、あなたは幼馴染との関係や、町に残る小さな違和感と向き合っていく。",
  "これは、ひと夏の思い出を描く物語。",
];
export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `春架かなた制作。${story.join("")}`,
};
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 10</span></header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/natsukage/cover.jpg`} alt="夏影に君を想う 葛城 澪と榛名 蛍のサムネイル" width="1280" height="1920" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：春架かなた</p>
          {story.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          <p className={styles.synopsis}>※ストーリーによって登場するキャラクターが異なります。</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTERS</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits id="mio" name="葛城 澪" />
          <div className={styles.bio}>
            <h3>葛城 澪<small>かつらぎ みお</small></h3>
            <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa41b3299cd1a5234a2d3bb" target="_blank" rel="noreferrer" aria-label="キャラぷで葛城 澪を開く（新しいタブ）">キャラぷで澪を開く <span aria-hidden="true">↗</span></a></p>
            <p className={styles.synopsis}>綾守町で生まれ育った、あなたの幼馴染。穏やかで優しく、誰に対しても思いやりのある少女。控えめな性格だが、大切な人を守りたいという強さを秘めている。</p>
          </div>
        </article>
        <article className={`${styles.character} ${styles.oto}`}>
          <Portraits id="hotaru" name="榛名 蛍" />
          <div className={styles.bio}>
            <h3>榛名 蛍<small>はるな ほたる</small></h3>
            <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa41b6935154311c38a8ab9" target="_blank" rel="noreferrer" aria-label="キャラぷで榛名 蛍を開く（新しいタブ）">キャラぷで蛍を開く <span aria-hidden="true">↗</span></a></p>
            <p className={styles.synopsis}>綾守町で生まれ育った、あなたの幼馴染。明るく親しみやすく、誰に対しても優しい青年。困っている人を放っておけず、頼られると断れない面もある。</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-10">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
