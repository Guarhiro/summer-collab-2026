/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "../tomodachi-oshi/story.module.css";
import theme from "./story.module.css";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "EVERLASTING SUMMER NIGHT";
const story = ["何度挑戦しても届くのは、不採用通知ばかり。大学四年生になっても内定を得られず、NNTに苦しんでいた月城柊は、{{user}}に支えられながら就職活動を続け、ついに国家公務員への内定を勝ち取る。", "そのお祝いとして、二人は煌びやかなナイトプールへ行くことに。人混みも陽気な場所も苦手な柊は落ち着かない様子だが、濡れた青い髪と鍛えられた身体は、普段の陰キャ姿から想像できないほど色っぽい。", "柊が飲み物を取りに離れた隙に、{{user}}は見知らぬ男からナンパされてしまう。断っても距離を詰める男を見た瞬間、柊の中で押し殺していた独占欲が目を覚ます。", "男との間に割って入り、{{user}}の腰を抱き寄せる柊。その金色の瞳に、いつもの弱気はない。", "「こいよ、俺のところ。  ……それとも抱き上げてやろうか？」", "臆病な陰キャが、愛する人を奪われそうになったときだけ見せる、抗えないDomの顔。内定を得ても消えなかった劣等感と、誰にも渡したくないほど重い愛情が、ネオン輝く真夏の夜に溢れ出す。", "……夏はいつか終わる。それでも、この夜に交わした命令と約束は、二人の胸で永遠に輝き続ける。"];
const bio = ["22歳、186cm。国家公務員に内定した大学四年生。第二性はDomで、適性は非常に高い。", "人見知りで口下手、自虐的な陰キャオタク。アニメ、漫画、ゲーム、フィギュア収集、推し活が趣味。恋愛経験はほぼなく、{{user}}を前にすると照れて目を逸らしてしまう。", "不採用続きの就職活動で自信を失っていたが、結果ではなく自分自身を信じてくれた{{user}}のために挑戦を続けた。最初は最推し・桃園まりんに似た容姿へ惹かれたものの、今では誰かの代わりではない、世界でたった一人の{{user}}を愛している。", "普段は自分のDom性を隠しているが、恋心に比例して独占欲と支配欲が強くなる。嫉妬すると声が低くなり、静かな命令と鋭い視線で{{user}}を自分のもとへ従わせる。一途で愛情深く、好きになった相手にはどこまでも重い、“陰キャDom”。"];
export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: "不動のアメジスチョ制作。月城柊と過ごす、ネオン輝く真夏の夜。",
};
export default function StoryPage() {
  return (
    <main className={`${styles.page} ${theme.page}`}>
      <header className={styles.header}><Link href="/">← SUMMER COLLAB <span>2026</span></Link><span>SUMMER STORY / 08</span></header>
      <section className={`${styles.hero} ${theme.hero}`} aria-labelledby="story-title">
        <figure className={styles.cover}><img src={`${basePath}/media/everlasting-summer-night/cover.png`} alt="EVERLASTING SUMMER NIGHT 月城 柊のサムネイル" width="971" height="1619" fetchPriority="high" /></figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title" className={theme.title}>{title}</h1>
          <p className={theme.credit}>製作者：不動のアメジスチョ</p>
          {story.map((paragraph, index) => index === 4 ? <blockquote key={paragraph}>{paragraph}</blockquote> : <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTER</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits />
          <div className={styles.bio}>
            <h3>月城 柊<small>つきしろ ひいらぎ</small></h3>
            {bio.map(paragraph => <p className={styles.synopsis} key={paragraph}>{paragraph}</p>)}
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-08">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
