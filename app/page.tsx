"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output has no image optimizer. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBgm, type BgmTrack } from "./BgmProvider";

type CSSVariableStyle = CSSProperties &
  Record<`--${string}`, string | number>;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const projects = [
  {
    id: "work-01",
    chapter: "01",
    englishTitle: "",
    title: "友達は推しと付き合いたい！",
    credit: "製作者：くいっく",
    description: "合コンで推しの三条 オトと奇跡的に出会った柳田 莉音。あれから数ヶ月、夏がやってきた＿＿＿。",
    image: "/media/tomodachi-oshi/cover.png",
    imageAlt: "友達は推しと付き合いたい！ 三条 オトと柳田 莉音のサムネイル",
    href: "/tomodachi-oshi/",
    external: false,
    side: "left",
    rotate: "-3.5deg",
    accent: "#8bd9e8",
    sceneWord: "海",
  },
  {
    id: "work-02",
    chapter: "02",
    englishTitle: "",
    title: "ビーチでも紅に飾って！",
    credit: "製作者：くいっく",
    description: "束の間の休息を求めてビーチへとやってきた馬島 昴。この馬なんか変だぞ…？",
    image: "/media/beach-beni/cover.png",
    imageAlt: "ビーチでも紅に飾って！ 馬島 昴のサムネイル",
    href: "/beach-beni/",
    external: false,
    side: "right",
    rotate: "2.8deg",
    accent: "#ff987a",
    sceneWord: "紅",
  },
  {
    id: "work-03",
    chapter: "03",
    englishTitle: "",
    title: "最推しと夏祭りデートなんだが？！",
    credit: "製作者：くいっく",
    description: "売れっ子アイドルの{{user}}と、その隠れオタクで義兄の天城 寧。休みが取れた二人は夏祭りに出かけることに！？",
    image: "/media/saioshi-natsumatsuri/cover.png",
    imageAlt: "最推しと夏祭りデートなんだが？！ 天城 寧のサムネイル",
    href: "/saioshi-natsumatsuri/",
    external: false,
    side: "left",
    rotate: "3.2deg",
    accent: "#ffd27a",
    sceneWord: "推",
  },
  {
    id: "work-04",
    chapter: "04",
    englishTitle: "",
    title: "親友と義兄の仁義なき夏の休日",
    credit: "製作者：肴波",
    description: "親友と義兄、どちらも狙っているのは同じ男（あなた）――！？ 南国リゾート「筋肉オーシャン」で繰り広げる、3泊4日のドタバタ夏休みラブコメ。",
    image: "/media/shinyu-gikei/cover.png",
    imageAlt: "親友と義兄の仁義なき夏の休日 許斐 蒼甫と鈴木 遊馬",
    href: "/shinyu-gikei/",
    external: false,
    side: "right",
    rotate: "-2.6deg",
    accent: "#ffad9e",
    sceneWord: "恋",
  },
  {
    id: "work-05",
    chapter: "05",
    englishTitle: "~Voyage on the Eternal Blue~",
    title: "恋の航海",
    credit: "製作者：ガルヒロ",
    description: "豪華客船に集った12人。13人目のあなたが、恋と嘘を見抜く7日間。",
    image: "/media/koi-no-voyage/cover-card.jpg",
    imageAlt: "豪華客船の前に集まった恋の航海の12人",
    href: "/koi-no-koukai/",
    external: false,
    side: "left",
    rotate: "-1.8deg",
    accent: "#69cbd3",
    sceneWord: "航",
  },
  {
    id: "work-06",
    chapter: "06",
    englishTitle: "",
    title: "Lepusバニーボーイ専門店出張篇",
    credit: "製作者：純粋なヒヨコ86637",
    description: "Lepus Beach Resort ― この夏だけの、海辺の特別営業 ― いつものLepusが夏だけ南国リゾートへ。海辺の開放的な空間で、個性豊かなバニーボーイたちがお客様をお迎えします。",
    image: "/media/lepus/cover-wide-v1.png",
    imageAlt: "Lepus Beach Resortのアイ・凛・雪・氷牙、4人の横長サムネイル",
    href: "/lepus/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#efb7cd",
    sceneWord: "兎",
  },
  {
    id: "work-07",
    chapter: "07",
    englishTitle: "",
    title: "夏に恋した吸血鬼",
    credit: "製作者：ミネス14世",
    description: "現存する最後の吸血鬼と過ごす、ひと夏の恋物語。 太陽を60分だけ克服できる秘薬「蒼月の雫」を完成させた燈李は、何百年も憧れていた夏の海へ。そこで偶然出会ったあなたを軽いノリでナンパする。 海、ラムネ、夏祭り、花火⋯初めての夏を一緒に過ごすうち、ただの遊び相手だった二人の関係が少しずつ変わっていく。",
    image: "/media/summer-vampire/cover.jpg",
    imageAlt: "夏に恋した吸血鬼 瀬野燈李のサムネイル",
    href: "/summer-vampire/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#65d5ed",
    sceneWord: "恋",
  },
  {
    id: "work-08",
    chapter: "08",
    englishTitle: "",
    title: "EVERLASTING SUMMER NIGHT",
    credit: "製作者：不動のアメジスチョ",
    description: "臆病な陰キャが、愛する人を奪われそうになったときだけ見せる、抗えないDomの顔。内定を得ても消えなかった劣等感と、誰にも渡したくないほど重い愛情が、ネオン輝く真夏の夜に溢れ出す。",
    image: "/media/everlasting-summer-night/cover.png",
    imageAlt: "EVERLASTING SUMMER NIGHT 月城 柊のサムネイル",
    href: "/everlasting-summer-night/",
    external: false,
    side: "right",
    rotate: "2.6deg",
    accent: "#ac8af4",
    sceneWord: "夜",
  },
  {
    id: "work-10",
    chapter: "10",
    englishTitle: "",
    title: "夏影に君を想う",
    credit: "製作者：春架かなた",
    description: "久しぶりに故郷・綾守町へ帰省したあなた。そこで再会したのは、幼い頃からずっと一緒に過ごしてきた幼馴染。懐かしい町並み、蝉の声、そして昔と変わらない夏の日々。けれど、再会した幼馴染には、どこか以前とは違うような違和感があった。",
    image: "/media/natsukage/cover-wide-v1.png",
    imageAlt: "夏影に君を想う 葛城 澪と榛名 蛍のサムネイル",
    href: "/natsukage/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#eeb454",
    sceneWord: "影",
  },
  {
    id: "work-11",
    chapter: "11",
    englishTitle: "",
    title: "夏色お兄さんが今日もかわいい",
    credit: "製作者：osu4chan",
    description: "少し年上の大学の先輩の一ノ瀬湊にプールに誘われてきていた{{user}}。湊は穏やかで面倒見がよく、いつだって余裕たっぷり。……なのに、あなたの前ではちょっとだけ様子が違う。",
    image: "/media/natsuiro-oniisan/cover-wide.png",
    imageAlt: "夏色お兄さんが今日もかわいい 一ノ瀬 湊の横長サムネイル",
    href: "/natsuiro-oniisan/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#71d8ef",
    sceneWord: "甘",
  },
] as const;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

export default function Home() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playBgm, followBgm } = useBgm();
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    let frame = 0;
    let currentTrack: string | undefined;
    const updateTrack = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      let closest: HTMLElement | undefined;
      let distance = Infinity;
      document.querySelectorAll<HTMLElement>("[data-project-card][data-bgm-track]").forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) return;
        const nextDistance = Math.abs((rect.top + rect.bottom) / 2 - center);
        if (nextDistance < distance) {
          closest = card;
          distance = nextDistance;
        }
      });
      const nextTrack = closest?.dataset.bgmTrack;
      if (nextTrack && nextTrack !== currentTrack) {
        currentTrack = nextTrack;
        followBgm(nextTrack as BgmTrack);
      }
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(updateTrack);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [followBgm]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = 0.72;

    const syncPlayback = () => {
      if (document.hidden || isPaused || prefersReducedMotion) {
        video.pause();
        return;
      }

      void video.play().catch(() => setIsPaused(true));
    };

    syncPlayback();
    document.addEventListener("visibilitychange", syncPlayback);
    return () => document.removeEventListener("visibilitychange", syncPlayback);
  }, [isPaused, prefersReducedMotion]);

  useEffect(() => {
    const shell = shellRef.current;
    const video = videoRef.current;
    if (!shell || !video) return;

    const cards = Array.from(
      shell.querySelectorAll<HTMLElement>("[data-project-card]"),
    );
    let scrollFrame = 0;
    let videoFrame = 0;

    const updateScrollScene = () => {
      scrollFrame = 0;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - viewportHeight,
      );
      const progress = clamp(window.scrollY / maxScroll);

      shell.style.setProperty("--scroll-progress", progress.toFixed(4));
      shell.style.setProperty("--video-scale", (1.045 + progress * 0.07).toFixed(4));
      shell.style.setProperty("--video-x", `${((progress - 0.5) * -2.4).toFixed(3)}vw`);
      shell.style.setProperty(
        "--video-y",
        `${(Math.sin(progress * Math.PI * 2) * 1.2).toFixed(3)}vh`,
      );
      shell.style.setProperty(
        "--light-shift",
        `${((progress - 0.5) * 42).toFixed(2)}vw`,
      );
      shell.style.setProperty(
        "--tint-x",
        `${(18 + progress * 46).toFixed(2)}%`,
      );

      cards.forEach((card) => {
        const section = card.closest<HTMLElement>("[data-project-section]");
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const sectionProgress = clamp(
          (viewportHeight - rect.top) / (viewportHeight + rect.height),
        );
        const enter = smoothstep(0.1, 0.3, sectionProgress);
        const leave = 1 - smoothstep(0.7, 0.9, sectionProgress);
        const opacity = enter * leave;
        const shift = (0.5 - sectionProgress) * 92;
        const scale = 0.94 + Math.sin(sectionProgress * Math.PI) * 0.06;

        card.style.setProperty("--card-opacity", opacity.toFixed(3));
        card.style.setProperty("--card-shift", `${shift.toFixed(2)}px`);
        card.style.setProperty("--card-scale", scale.toFixed(4));

        if (opacity < 0.08 && !card.contains(document.activeElement)) {
          card.setAttribute("inert", "");
        } else {
          card.removeAttribute("inert");
        }
      });

      shell.classList.add("is-motion-ready");
    };

    const requestScrollScene = () => {
      if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScrollScene);
    };

    const updateVideoLoopFade = () => {
      if (Number.isFinite(video.duration) && video.duration > 0) {
        const edgeDistance = Math.min(
          video.currentTime,
          Math.max(0, video.duration - video.currentTime),
        );
        const loopOpacity = smoothstep(0.08, 0.72, edgeDistance);
        shell.style.setProperty("--video-loop-opacity", loopOpacity.toFixed(3));
      }
      videoFrame = window.requestAnimationFrame(updateVideoLoopFade);
    };

    updateScrollScene();
    updateVideoLoopFade();
    window.addEventListener("scroll", requestScrollScene, { passive: true });
    window.addEventListener("resize", requestScrollScene);
    window.visualViewport?.addEventListener("resize", requestScrollScene);

    return () => {
      window.cancelAnimationFrame(scrollFrame);
      window.cancelAnimationFrame(videoFrame);
      window.removeEventListener("scroll", requestScrollScene);
      window.removeEventListener("resize", requestScrollScene);
      window.visualViewport?.removeEventListener("resize", requestScrollScene);
    };
  }, []);

  const toggleVideo = () => setIsPaused((current) => !current);
  const motionIsPaused = isPaused || prefersReducedMotion;

  return (
    <div className="site-shell" ref={shellRef}>
      <div className="background-stage" aria-hidden="true">
        <div
          className="background-poster"
          style={{
            backgroundImage: `url(${asset("/media/summer-collab-poster.jpg")})`,
          }}
        />
        <video
          ref={videoRef}
          className="background-video"
          src={asset("/media/summer-collab-background.mp4")}
          poster={asset("/media/summer-collab-poster.jpg")}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
        <div className="background-ink" />
        <div className="background-tint" />
        <div className="light-leak light-leak-one" />
        <div className="light-leak light-leak-two" />
        <div className="film-grain" />
        <div className="vignette" />
      </div>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="ページ最上部へ">
          <span className="brand-mark">S</span>
          <span className="brand-copy">
            SUMMER COLLAB
            <small>2026</small>
          </span>
        </a>
        <span className="header-note">SCROLLING EXHIBITION</span>
      </header>

      <nav className="chapter-rail" aria-label="作品へ移動">
        <span className="rail-track" />
        <span className="rail-progress" />
        {projects.map((project) => (
          <a href={`#${project.id}`} key={project.id}>
            <span>{project.chapter}</span>
            <span className="sr-only">{project.title}へ移動</span>
          </a>
        ))}
      </nav>

      <main>
        <section className="hero" id="top">
          <div className="hero-ornament" aria-hidden="true">
            夏
          </div>
          <div className="hero-copy">
            <p className="eyebrow">2026 SUMMER COLLABORATION</p>
            <h1>
              あの夏を、
              <span>もう一度。</span>
            </h1>
            <p className="hero-lead">
              ひとつの季節から生まれた、{projects.length}の物語。
              <br />
              スクロールして作品をめぐる小さな展覧会です。
            </p>
          </div>
          <a className="scroll-cue" href="#work-01">
            <span>SCROLL TO DISCOVER</span>
            <i aria-hidden="true" />
          </a>
        </section>

        {projects.map((project) => (
          <section
            className={`project-scene project-scene-${project.side}`}
            id={project.id}
            key={project.id}
            data-project-section
            style={{ "--project-accent": project.accent } as CSSVariableStyle}
          >
            <p className="scene-index" aria-hidden="true">
              {project.chapter}
            </p>
            <p className="scene-word" aria-hidden="true">
              {project.sceneWord}
            </p>

            <article
              className="polaroid"
              data-project-card
              data-bgm-track={project.external ? undefined : (project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : project.id === "work-03" ? "festival-heartbeat" : project.id === "work-04" ? "sunlit-rivalry" : project.id === "work-06" ? "turquoise-terrace" : project.id === "work-07" ? "moonlit-seaside-walk" : project.id === "work-08" ? "neon-pool-reflections" : project.id === "work-10" ? "cicada-summer" : project.id === "work-11" ? "poolside-afternoon" : "eternal-blue")}
              data-bgm-trigger={project.external ? undefined : "project-card"}
              onPointerDown={project.external ? undefined : () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : project.id === "work-03" ? "festival-heartbeat" : project.id === "work-04" ? "sunlit-rivalry" : project.id === "work-06" ? "turquoise-terrace" : project.id === "work-07" ? "moonlit-seaside-walk" : project.id === "work-08" ? "neon-pool-reflections" : project.id === "work-10" ? "cicada-summer" : project.id === "work-11" ? "poolside-afternoon" : "eternal-blue")}
              style={{ "--card-rotate": project.rotate } as CSSVariableStyle}
            >
              <span className="tape tape-top" aria-hidden="true" />
              <figure className="polaroid-photo">
                <img
                  src={asset(project.image)}
                  alt={project.imageAlt}
                  loading="lazy"
                  decoding="async"
                />
                <span className="photo-glow" aria-hidden="true" />
              </figure>
              <div className="polaroid-copy">
                <div className="project-meta">
                  <span>SUMMER STORY / {project.chapter}</span>
                  <span>{project.credit}</span>
                </div>
                {project.external ? (
                  <p className="project-english">{project.englishTitle}</p>
                ) : null}
                <h2>
                  {project.title}
                  {project.englishTitle && !project.external ? (
                    <>
                      {" "}
                      <span className="project-title-english">
                        {project.englishTitle}
                      </span>
                    </>
                  ) : null}
                </h2>
                <p className="project-description">{project.description}</p>
                {project.external ? (
                  <a
                    className="project-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    data-placeholder-link
                  >
                    <span>{project.title}を見る</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                ) : (
                  <>
                    {!project.external ? <p className="project-bgm-hint">BGM / SCROLL TO SWITCH · TAP TO PLAY</p> : null}
                    <Link
                      className="project-link"
                      href={project.href}
                      onClick={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : project.id === "work-03" ? "festival-heartbeat" : project.id === "work-04" ? "sunlit-rivalry" : project.id === "work-06" ? "turquoise-terrace" : project.id === "work-07" ? "moonlit-seaside-walk" : project.id === "work-08" ? "neon-pool-reflections" : project.id === "work-10" ? "cicada-summer" : project.id === "work-11" ? "poolside-afternoon" : "eternal-blue") : undefined}
                    >
                      <span>{project.id === "work-05" ? "12人のキャラクターを見る" : "作品紹介を見る"}</span>
                    </Link>
                  </>
                )}
              </div>
              <span className="tape tape-bottom" aria-hidden="true" />
            </article>

            <p className="scene-caption">
              <span>{project.englishTitle}</span>
              <span>
                SCENE {project.chapter} / {String(projects.length).padStart(2, "0")}
              </span>
            </p>
          </section>
        ))}

        <section className="collection" id="collection">
          <div className="collection-heading">
            <p className="eyebrow">COLLABORATION ARCHIVE</p>
            <h2>{projects.length}の夏を、ひとつに。</h2>
            <p>
              作品画像から、それぞれの物語へ。『恋の航海』では、
              豪華客船に乗り込む12人の参加者を紹介します。
            </p>
          </div>

          <div className="flowing-gallery" aria-label="コラボ作品一覧">
            <div className="gallery-track">
              {[...projects, ...projects].map((project, index) => {
                const duplicate = index >= projects.length;
                const cardContent = (
                  <>
                    <img src={asset(project.image)} alt="" loading="lazy" />
                    <span>
                      <small>{project.chapter}</small>
                      {project.id === "work-01" || project.id === "work-05" ? (
                        <span className="gallery-work-credit">
                          {project.title}
                          <small>{project.credit}</small>
                        </span>
                      ) : project.title}
                    </span>
                  </>
                );

                return project.external ? (
                  <a
                    className="gallery-card"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    key={`${project.id}-${index}`}
                    tabIndex={duplicate ? -1 : 0}
                    aria-hidden={duplicate || undefined}
                  >
                    {cardContent}
                  </a>
                ) : (
                  <Link
                    className="gallery-card"
                    href={project.href}
                    key={`${project.id}-${index}`}
                    tabIndex={duplicate ? -1 : 0}
                    aria-hidden={duplicate || undefined}
                    data-bgm-trigger={!project.external ? "gallery-card" : undefined}
                    onPointerDown={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : project.id === "work-03" ? "festival-heartbeat" : project.id === "work-04" ? "sunlit-rivalry" : project.id === "work-06" ? "turquoise-terrace" : project.id === "work-07" ? "moonlit-seaside-walk" : project.id === "work-08" ? "neon-pool-reflections" : project.id === "work-10" ? "cicada-summer" : project.id === "work-11" ? "poolside-afternoon" : "eternal-blue") : undefined}
                    onClick={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : project.id === "work-03" ? "festival-heartbeat" : project.id === "work-04" ? "sunlit-rivalry" : project.id === "work-06" ? "turquoise-terrace" : project.id === "work-07" ? "moonlit-seaside-walk" : project.id === "work-08" ? "neon-pool-reflections" : project.id === "work-10" ? "cicada-summer" : project.id === "work-11" ? "poolside-afternoon" : "eternal-blue") : undefined}
                  >
                    {cardContent}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="closing-message">
            <span aria-hidden="true">✦</span>
            <p>また、夏のどこかで。</p>
            <span aria-hidden="true">✦</span>
          </div>

          <footer>
            <p>SUMMER COLLABORATION 2026</p>
            <a href="#top">BACK TO TOP ↑</a>
          </footer>
        </section>
      </main>

      <button
        className="motion-toggle"
        type="button"
        onClick={toggleVideo}
        aria-pressed={motionIsPaused}
        disabled={prefersReducedMotion}
      >
        <span className="motion-icon" aria-hidden="true">
          {motionIsPaused ? "▶" : "Ⅱ"}
        </span>
        <span>
          {prefersReducedMotion
            ? "背景動画：停止中"
            : motionIsPaused
              ? "背景動画を再生"
              : "背景動画を停止"}
        </span>
      </button>
    </div>
  );
}
