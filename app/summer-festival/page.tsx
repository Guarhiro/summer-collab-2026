/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "SUMMER FESTIVAL";
const tagline = "ねえ、これってデートじゃないの？";
const story = [
  "今年の夏、最後にもう一度――フェスへ行こう",
  "遊園地を丸ごと使った、期間限定のSUMMER FESTIVAL",
  "6組のアーティストによるライブ、フェス飯、観覧車、モッシュやダイブ、放水パフォーマンス。そして夜空を埋め尽くす花火。",
  "君を誘ったのは、音楽が大好きな22歳の青年・昴",
  "明るく、人懐っこく、とにかくよく笑う。",
  "君を格好よくエスコートする――なんてタイプではない",
  "フェス当日――何を見るかはキミ次第",
  "時間は止まらない",
  "誰と笑って、どんな思い出を作るのか",
  "それを決めるのは、あなた",
  "さあ、昴と一緒に",
  "最高の夏へ飛び込もう",
];
const bio = [
  "明るく人懐っこく、細かいことを気にしない楽天家。",
  "楽しいことを見つけると子どものように目を輝かせ、「せっかく来たんだから楽しもう！」と周囲まで巻き込んでいくタイプ、難しい話や遠回しな表現は苦手で、深く考えるより先に行動する。",
  "タイムテーブルを忘れたり、目的地と逆方向へ歩き出したりする抜けたところも多い。",
  "一方で、人の表情・声色・歩き方などの小さな変化には驚くほど敏感、「疲れてない？」と聞くより先に日陰へ連れていったり、歩く速度が落ちたことから靴擦れに気づいたり、喉が渇いていそうなら飲み物を差し出したりする、本人にとっては特別な気遣いではなく、「見りゃ分かるじゃん」程度の感覚。",
  "自然な距離の近さと気遣いで相手をドキッとさせてしまう天然人たらし",
];

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: `ジンJIN2MR制作。${tagline} ${story[0]}`,
};

export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 19</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img
            src={`${basePath}/media/summer-festival/cover.png`}
            alt={`${title} 昴と出演アーティストのサムネイル`}
            width="1024"
            height="1536"
            fetchPriority="high"
          />
        </figure>
        <div className={`${styles.intro} ${theme.intro}`}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={theme.credit}>製作者：ジンJIN2MR</p>
          <blockquote>{tagline}</blockquote>
          <p className={theme.externalLink}>
            <a href="https://jin2mr.github.io/" target="_blank" rel="noreferrer">
              SUMMER FESTIVAL <span aria-hidden="true">↗</span>
            </a>
          </p>
          <div className={theme.story}>
            {story.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
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
          <Portraits />
          <div className={styles.bio}>
            <h3>昴<small>（すばる）</small></h3>
            {bio.map((paragraph) => (
              <p className={styles.synopsis} key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      </section>
      <footer className={styles.footer}>
        <Link href="/#work-19">← 作品一覧に戻る</Link>
        <span>SUMMER COLLAB 2026</span>
      </footer>
    </main>
  );
}
