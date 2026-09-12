/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "ガチムチパイセン海でも訓練ってマジすか";
const introduction = "いつもは駐屯地で容赦ない訓練の日々。けれど8月の特別訓練の舞台は、まさかの海――！ ……だからって遊べると思った？甘い。砂浜も水中も、やることはいつも以上にえげつない。 鬼先輩・神城仁の鞭！鞭！鞭！に耐えたその先で、ようやく海遊び、勝負、海の家《はれの屋》での休憩タイム。 しかも今年は、まさかの筋肉祭りまで開催？！ え？仁パイセン、出るんすか？！本気で？！その筋肉、祭りに放り込むんすか？！ 訓練だけじゃ終わらない。海辺ではコラボキャラとの交流やハプニング、勝負に自由時間まで盛りだくさん。 ……あれ？鞭！鞭！鞭！飴！飴？ちょっと待って、いつもより飴多くない？！ 厳しさ全開、それでもどこか甘い仁と過ごす、夏限定の海の鬼訓練！！❤";
export const metadata: Metadata = { title: `${title}｜SUMMER COLLAB 2026`, description: introduction };
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 13</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/gachimuchi-paisen/cover.jpg`} alt={title + "のサムネイル"} width="1024" height="1536" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">{title}</h1>
          <p className={styles.synopsis}>製作者：夜の申し子</p>
          <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa418b8db15d6359683208c" target="_blank" rel="noreferrer" aria-label="キャラぷで「ガチムチパイセン海でも訓練ってマジすか」を開く（新しいタブ）">キャラぷで作品を開く <span aria-hidden="true">↗</span></a></p>
          <p className={styles.synopsis}>{introduction}</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={`${styles.bio} ${theme.bio}`}>
            <h3>神城 仁<small>かみしろ じん</small></h3>
            <p>27歳／190cm／陸上自衛隊・2等陸曹</p>
            <p>黒髪ツーブロック、鋭いグレーの目、右頬の古傷が印象的なガチムチ鬼先輩。<br />普段は駐屯地で後輩を容赦なく鍛える厳しい指導役で、「できません」では終わらせないタイプ。<br />ただし本当に危険な無理はさせず、誰より周囲をよく見ている面倒見のいい兄貴分。</p>
            <p>訓練外では意外と冗談も言うが、恋愛になると途端に不器用。<br />心配していても「管理だ」と誤魔化し、褒める時もぶっきらぼう。<br />好きな相手ほど言葉より行動に出る。</p>
            <p className={theme.sweet}>恋には不器用です❤</p>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-13">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
