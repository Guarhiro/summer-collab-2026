/* eslint-disable @next/next/no-img-element -- Preserve supplied artwork on static hosting. */
import type { Metadata } from "next";
import Link from "next/link";
import Portraits from "./Portraits";
import SectionLink from "./SectionLink";
import { stories } from "./stories";
import styles from "./story.module.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: "はれの屋恋日和｜波瑠・透華・莉乃｜SUMMER COLLAB 2026",
  description: "天音しあ制作。海の家「はれの屋」を舞台に、波瑠・透華・莉乃それぞれとのひと夏の恋を描く、恋愛ビジュアルノベル三作の作品・キャラクター紹介。",
};

export default function StoryPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">← SUMMER COLLAB <span>2026</span></Link>
        <span>SUMMER STORY / 15</span>
      </header>

      <section className={styles.hero} aria-labelledby="series-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>海の家「はれの屋」恋愛ビジュアルノベルシリーズ</p>
          <h1 id="series-title"><span>はれの屋</span>恋日和</h1>
          <p className={styles.seriesNames}>波瑠の場合<span> / </span>透華の場合<span> / </span>莉乃の場合</p>
          <p className={styles.credit}>製作者：天音しあ</p>
          <p className={styles.heroLead}>同じ海の家で紡がれる、<br />三人それぞれの、ひと夏の恋。</p>
          <SectionLink className={styles.jump} href="#stories">三つの物語を見る <span aria-hidden="true">↓</span></SectionLink>
        </div>
        <figure className={styles.ensemble}>
          <img src={`${basePath}/media/harenoya/ensemble.png`} alt="海の家「はれの屋」で働く三人。左から透華、波瑠、莉乃。" width="1536" height="1024" fetchPriority="high" />
          <figcaption>HARENOYA <span>SUMMER DAYS, THREE STORIES.</span></figcaption>
        </figure>
      </section>

      <section id="stories" className={styles.stories} aria-labelledby="stories-title">
        <div className={styles.sectionHeading}>
          <p className={styles.eyebrow}>THREE STORIES</p>
          <h2 id="stories-title">はれの屋で、どの恋に出会う？</h2>
          <p>波瑠・透華・莉乃の物語と、彼女たちのこと。</p>
        </div>
        <nav className={styles.storyCards} aria-label="三作の作品・キャラクター紹介へ">
          {stories.map((story, index) => (
            <SectionLink className={`${styles.storyCard} ${styles[story.id]}`} href={`#${story.id}`} key={story.id}>
              <img src={`${basePath}/media/harenoya/${story.id}-cover.png`} alt={story.title} width="1024" height="1536" loading="lazy" />
              <div className={styles.cardCaption}>
                <span className={styles.cardNumber}>0{index + 1}</span>
                <span><strong>～{story.shortName}の場合～</strong><small>{story.name}</small></span>
                <span className={styles.cardArrow} aria-hidden="true">↓</span>
              </div>
            </SectionLink>
          ))}
        </nav>
      </section>

      <div className={styles.details}>
        {stories.map((story, index) => (
          <section id={story.id} className={`${styles.story} ${styles[story.id]}`} key={story.id} aria-labelledby={`${story.id}-title`}>
            <div className={styles.storyHeading}>
              <span className={styles.storyNumber} aria-hidden="true">0{index + 1}</span>
              <h2 id={`${story.id}-title`}><span>はれの屋恋日和</span>～{story.shortName}の場合～</h2>
            </div>
            <div className={styles.storyContent}>
              <Portraits id={story.id} name={story.name} />
              <div className={styles.storyText}>
                <div className={styles.synopsis}>
                  <h3 className={styles.textLabel}>作品紹介</h3>
                  <p>{story.description}</p>
                </div>
                <div className={styles.bio}>
                  <p className={styles.textLabel}>キャラクター紹介</p>
                  <p className={styles.role}>{story.role}<span>{story.age}</span></p>
                  <h3>{story.name}<small>{story.reading}</small></h3>
                  <p>{story.bio}</p>
                </div>
                <SectionLink className={styles.backToStories} href="#stories">三つの物語に戻る <span aria-hidden="true">↑</span></SectionLink>
              </div>
            </div>
          </section>
        ))}
      </div>

      <footer className={styles.footer}>
        <Link href="/#work-15">← 作品一覧に戻る</Link>
        <span>はれの屋恋日和 <small>製作者：天音しあ</small></span>
      </footer>
    </main>
  );
}
