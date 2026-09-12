/* eslint-disable @next/next/no-img-element -- Supplied images are served by static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import styles from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const title = "親友と義兄の仁義なき夏の休日";
const introduction = "親友と義兄、どちらも狙っているのは同じ男（あなた）――！？ 南国リゾート「筋肉オーシャン」を舞台に、20歳の主人公をめぐって親友・許斐蒼甫と義兄・鈴木遊馬が恋の火花を散らす、3泊4日のドタバタ夏休みラブコメ。 筋肉コンテストに海遊び、花火にバカンスイベントまで盛りだくさん。幼なじみ級の距離感で攻める親友と、大人の余裕で囲い込む義兄。二人の仁義なき恋愛バトルに巻き込まれながら、誰とどんな夏を過ごすかはあなた次第。";

export const metadata: Metadata = {
  title: `${title}｜SUMMER COLLAB 2026`,
  description: introduction,
  openGraph: {
    title, description: introduction,
    images: [{ url: `${basePath}/media/shinyu-gikei/cover.png`, width: 1023, height: 1537, alt: title }],
    locale: "ja_JP", type: "website",
  },
};

export default function StoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 04</span>
      </header>
      <section className={styles.hero} aria-labelledby="story-title">
        <figure className={styles.cover}>
          <img src={`${basePath}/media/shinyu-gikei/cover.png`} alt={`${title} 許斐 蒼甫と鈴木 遊馬`} width="1023" height="1537" fetchPriority="high" />
        </figure>
        <div className={styles.intro}>
          <p className={styles.label}>作品紹介</p>
          <h1 id="story-title">親友と義兄の<span>仁義なき</span>夏の休日</h1>
          <p className={styles.label}>製作者：肴波</p>
          <p className={styles.externalLink}><a href="https://s.kyarapu.com/s/6aa42d4826a694352a0345b3" target="_blank" rel="noreferrer" aria-label="キャラぷで「親友と義兄の仁義なき夏の休日」を開く（新しいタブ）">キャラぷで作品を開く <span aria-hidden="true">↗</span></a></p>
          <p className={styles.synopsis}>{introduction}</p>
          <a className={styles.jump} href="#characters">登場人物を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <section id="characters" className={styles.characters} aria-labelledby="characters-title">
        <div className={styles.sectionHeading}><p className={styles.label}>CHARACTERS</p><h2 id="characters-title">登場人物</h2></div>
        <article className={styles.character}>
          <Portraits id="sosuke" name="許斐 蒼甫" />
          <div className={styles.bio}>
            <p className={styles.label}>01 / 親友・20歳・茶色髪</p>
            <h3>許斐 蒼甫<small>このみ そうすけ</small></h3>
            <p>20歳。主人公の高校時代からの親友で、恋に関しては意外とロマンチスト。高校時代に一目惚れして以来ずっと主人公が好きで、周囲にはほぼバレバレ。親友ならではの近さと行動力が最大の武器だが、いざ恋愛らしい一線を越えようとすると照れてしまう一面も。義兄・遊馬を強烈なライバルとして意識している。</p>
            <blockquote>｢俺と一緒に海で遊ぼうぜ！｣</blockquote>
          </div>
        </article>
        <article className={`${styles.character} ${styles.yuma}`}>
          <Portraits id="yuma" name="鈴木 遊馬" />
          <div className={styles.bio}>
            <p className={styles.label}>02 / 義兄・24歳・緑髪</p>
            <h3>鈴木 遊馬<small>すずき ゆうま</small></h3>
            <p>24歳。主人公とは血のつながらない義兄。中学生の頃に家族となって以来、長年主人公へ想いを寄せている。普段は穏やかで余裕があり、スキンシップも積極的。財力・知力・人脈まで駆使して自然に二人きりの時間を作る策士だが、主人公の方から恋愛的に迫られると途端に調子を崩す。「優しい兄」ではなく、一人の男として見てもらうことを狙っている。</p>
            <blockquote>｢兄ちゃんと一緒にバカンスに行こう！｣</blockquote>
          </div>
        </article>
      </section>
      <footer className={styles.footer}><Link href="/#work-04">← 作品一覧に戻る</Link><span>SUMMER COLLAB 2026</span></footer>
    </main>
  );
}
