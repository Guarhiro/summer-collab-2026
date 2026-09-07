"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output has no image optimizer. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBgm } from "./BgmProvider";

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
    englishTitle: "A LIGHT IN THE DARK",
    title: "星灯りの約束",
    credit: "COLLABORATOR C",
    description: "夜の海に浮かんだ、小さな光を忘れないために。",
    image: "/media/summer-night-sparkler.jpg",
    imageAlt: "夜の海辺で光を掲げる青年",
    href: "https://example.com/?work=summer-collab-03",
    external: true,
    side: "left",
    rotate: "3.2deg",
    accent: "#ffd27a",
    sceneWord: "光",
  },
  {
    id: "work-04",
    chapter: "04",
    englishTitle: "FIREWORKS, THEN SILENCE",
    title: "風鈴花火",
    credit: "COLLABORATOR D",
    description: "祭囃子が遠ざかっても、ふたりの夏はまだ終わらない。",
    image: "/media/summer-festival-fireworks.jpg",
    imageAlt: "夏祭りの夜に花火を見上げる浴衣姿の二人",
    href: "https://example.com/?work=summer-collab-04",
    external: true,
    side: "right",
    rotate: "-2.6deg",
    accent: "#ffad9e",
    sceneWord: "祭",
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
  const { playBgm } = useBgm();
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

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
              ひとつの季節から生まれた、五つの物語。
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
              data-bgm-trigger={project.external ? undefined : "project-card"}
              onMouseEnter={project.external ? undefined : () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue")}
              onFocusCapture={project.external ? undefined : () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue")}
              onPointerDown={project.external ? undefined : () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue")}
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
                    {!project.external ? <p className="project-bgm-hint">BGM / HOVER OR TAP TO PLAY</p> : null}
                    <Link
                      className="project-link"
                      href={project.href}
                      onClick={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue") : undefined}
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
            <h2>五つの夏を、ひとつに。</h2>
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
                    onMouseEnter={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue") : undefined}
                    onFocus={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue") : undefined}
                    onPointerDown={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue") : undefined}
                    onClick={!project.external ? () => void playBgm(project.id === "work-01" ? "breezy-seaside-romance" : project.id === "work-02" ? "sunny-beach-afternoon" : "eternal-blue") : undefined}
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
