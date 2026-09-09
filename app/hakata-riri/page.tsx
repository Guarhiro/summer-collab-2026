/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "博多弁の女を離すな！";
const story = [
  "「せっかくの夏休みやし、一週間ずーっと一緒におれるんよ？　そりゃ楽しみにするに決まっとるやん♪」",
  "今回の舞台は、海辺の観光都市・汐凪市。白い砂浜で泳いだり、水族館へ行ったり、マリーナで遊んだり、旧市街を歩いたり。夜は夏祭りに花火もあるし、ホテルでのんびりするのもよかよね。私、来る前からSNSめちゃくちゃ調べたんよ。映える場所も、美味しい店も、穴場も保存しまくって、スマホの旅行フォルダが大変なことになっとる♪",
  "でも、全部予定通りじゃつまらんやろ？　突然雨が降ったり、面白そうな店を見つけて寄り道したり、海辺で変な勝負を始めたり……そういうハプニングまで二人の思い出にしたい。写真もいっぱい撮りたいし、お揃いのお土産も欲しいし、一週間じゃ足りんくらい遊びたい！",
  "「……ただ、一個だけ秘密があるっちゃん」",
  "たまに私がスマホを慌てて隠したり、知らない人とこっそり話したり、一人でどこかへ行ったりしても――理由はまだ教えんよ？　だって、今言ったら台無しやもん。別に怪しいことなんて……ふふっ、なんでもない♪",
  "ちゃんと準備できた時に、{{user}}がどんな顔するかなって想像したら、どうしてもニヤけてしまうけど……まだ秘密。絶対びっくりさせちゃるけん。",
  "だから今は、一緒に海も街もお祭りも全部楽しもう？　帰る頃にはスマホの写真フォルダが私たちでいっぱいになっとったら最高やん。……あ、帰る話はまだ禁止ね。一週間、ずっと一緒なんやけん♪",
];

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `ガンズベリー制作。${story[0]}`,
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 16</span>
      </header>
      <section className={`${styles.hero} ${theme.hero}`} aria-labelledby="story-title">
        <figure className={`${styles.cover} ${theme.cover}`}>
          <img
            src={`${basePath}/media/hakata-riri/cover.png`}
            alt={`${title} 秋月 莉里のサムネイル`}
            width="1024"
            height="1536"
            fetchPriority="high"
          />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：ガンズベリー</p>
          {story.map((paragraph) => (
            <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
          ))}
          <a className={styles.jump} href="#characters">
            登場人物を見る <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}>
          <p className={styles.label}>CHARACTER</p>
          <h2 id="characters-title">登場人物</h2>
        </div>
        <article className={styles.character}>
          <div className={styles.portraits}>
            <img
              className={`${styles.portrait} ${theme.portrait}`}
              src={`${basePath}/media/hakata-riri/riri.png`}
              alt="海辺で手を伸ばす秋月 莉里"
              width="1024"
              height="1536"
              loading="lazy"
            />
          </div>
          <div className={styles.bio}>
            <h3>秋月 莉里</h3>
            <p>福岡から上京してきたばかりの大学２年生。とびきり可愛い。主人公の彼女で交際一年目。</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}>
        <Link href="/#work-16">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
