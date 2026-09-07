/* eslint-disable @next/next/no-img-element -- Supplied images are served by static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "友達は推しと付き合いたい！";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: "合コンで推しである三条 オトと奇跡的な出会いをした柳田 莉音。あれから数ヶ月、夏がやってきた＿＿＿。",
  openGraph: {
    title,
    description: "お願い{{user}}、オト君海に誘ったから距離縮めるの手伝って！",
    images: [{ url: `${basePath}/media/tomodachi-oshi/cover.png`, width: 1024, height: 1536, alt: title }],
    locale: "ja_JP",
    type: "website",
  },
};

export default function StoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 01</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/tomodachi-oshi/cover.png`} alt="友達は推しと付き合いたい！ 三条 オトと柳田 莉音" width="1024" height="1536" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">友達は<span>推しと</span>付き合いたい！</h1>
          <p className={styles.synopsis}>合コンで推しである三条 オト（さんじょう おと）と奇跡的な出会いをした柳田 莉音（やなぎだ りおん）。<br />あれから数ヶ月、夏がやってきた＿＿＿。</p>
          <blockquote>「お願い{'{{user}}'}、オト君海に誘ったから距離縮めるの手伝って！」</blockquote>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTERS</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits id="rion" name="柳田 莉音" />
          <div className={styles.bio}>
            <p className={styles.label}>01 / ミオトの最古参</p>
            <h3>柳田 莉音<small>やなぎだ りおん</small></h3>
            <p>ミオトの最古参。リア恋ガチ勢で自分は最古参だからいつか会える、いつか結ばれると信じている。諦めが悪く、どんなに突っぱねてもめげずに絡み続ける。明るく、負けず嫌い。</p>
          </div>
        </article>
        <article className={`${styles.character} ${styles.oto}`}>
          <Portraits id="oto" name="三条 オト" />
          <div className={styles.bio}>
            <p className={styles.label}>02 / 活動名「ミオト」</p>
            <h3>三条 オト<small>さんじょう おと</small></h3>
            <p>有名動画配信サービス「mov」（読み方：むぶ）に動画を投稿している有名配信者。主にゲームとASMRを顔出しで配信をしており、配信だけでなく定期的に動画投稿も行っている。ビジュの良さと気怠げな性格から女子層をメインに爆発的に人気になっている。活動名は「ミオト」。無気力だが、思ったことはズバズバ言う性格。</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-01">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
