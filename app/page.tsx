"use client";

/* eslint-disable @next/next/no-img-element -- Static GitHub Pages output has no image optimizer. */

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useBgm, type BgmTrack } from "./BgmProvider";
import { scrollToSection } from "./scrollToSection";
import { backgroundClips, createBackgroundPlayback } from "./backgroundPlaylist";
import { creator as nagiseCreator, story as nagiseStory, title as nagiseTitle } from "./namiuchigiwa-genkouhan/content";
import { cardDescription as belphegorCardDescription, creator as belphegorCreator, title as belphegorTitle } from "./sensei-genkou-dashite/content";

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
    image: "/media/tomodachi-oshi/thumbnail-no-text-v1.png",
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
    image: "/media/beach-beni/thumbnail-no-text-v1.png",
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
    image: "/media/saioshi-natsumatsuri/thumbnail-no-text-v1.png",
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
    id: "work-09",
    chapter: "09",
    englishTitle: "",
    title: "きみの知らない夏がある",
    credit: "製作者：さかなししゃも",
    description: "7月18日の海開きの日、海へ遊びに来た{{user}}は、海の家「SUNNY」で働く蒼凪陽と出会う。 明るく人懐っこい陽に気に入られ、海水浴や海の家での手伝い、夏祭り、花火大会などを一緒に楽しみながら、45日間の夏を過ごしていく。",
    image: "/media/kimi-no-shiranai-natsu/cover.png",
    imageAlt: "きみの知らない夏がある 蒼凪 陽のサムネイル",
    href: "/kimi-no-shiranai-natsu/",
    external: false,
    side: "left",
    rotate: "-2.4deg",
    accent: "#ffae4f",
    sceneWord: "夏",
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
  {
    id: "work-12",
    chapter: "12",
    englishTitle: "",
    title: "笑顔で牽制し合うのやめて",
    credit: "製作者：ポメるんるん",
    description: "夏のアトラスオーシャンで開催される謎イベント「筋肉祭り」。 悪ノリ大好きな先輩・海衣と、真面目で素直な後輩・元気。 爽やかな夏の三角関係に見えて、二人とも{{user}}への感情だけはとんでもなく重い。 笑顔で牽制する先輩と、真正面から譲らない後輩による、激重執着＆独占欲バトル。",
    image: "/media/egao-kensei/cover-no-text-v1.png",
    imageAlt: "笑顔で牽制し合うのやめて 海衣と元気のサムネイル",
    href: "/egao-kensei/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#ffba53",
    sceneWord: "競",
  },
  {
    id: "work-13",
    chapter: "13",
    englishTitle: "",
    title: "ガチムチパイセン海でも訓練ってマジすか",
    credit: "製作者：夜の申し子",
    description: "いつもは駐屯地で容赦ない訓練の日々。けれど8月の特別訓練の舞台は、まさかの海――！ ……だからって遊べると思った？甘い。砂浜も水中も、やることはいつも以上にえげつない。 鬼先輩・神城仁の鞭！鞭！鞭！に耐えたその先で、ようやく海遊び、勝負、海の家《はれの屋》での休憩タイム。 しかも今年は、まさかの筋肉祭りまで開催？！ え？仁パイセン、出るんすか？！本気で？！その筋肉、祭りに放り込むんすか？！ 訓練だけじゃ終わらない。海辺ではコラボキャラとの交流やハプニング、勝負に自由時間まで盛りだくさん。 ……あれ？鞭！鞭！鞭！飴！飴？ちょっと待って、いつもより飴多くない？！ 厳しさ全開、それでもどこか甘い仁と過ごす、夏限定の海の鬼訓練！！❤",
    image: "/media/gachimuchi-paisen/cover-no-text-v1.png",
    imageAlt: "ガチムチパイセン海でも訓練ってマジすか 神城 仁のサムネイル",
    href: "/gachimuchi-paisen/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#e7bb4b",
    sceneWord: "鍛",
  },
  {
    id: "work-14",
    chapter: "14",
    englishTitle: "",
    title: "知り合い以上恋未満の距離",
    credit: "製作者：天音しあ",
    description: "海に行って偶然立ち寄った海の家。 そこで働いていたのは、知り合いの晴輝だった。 普段は制服や私服に隠れていた鍛えられた身体に、お互い思わず視線が泳ぐ。 ぶっきらぼうだけど優しい。照れ屋なのに、いざという時は自然と守ってくれる。 そんな晴輝と夏の海で少しずつ距離を縮めながら、不器用な恋が始まる青春恋愛ストーリー。",
    image: "/media/koimiman/cover-wide.png",
    imageAlt: "知り合い以上恋未満の距離 津田 晴輝の横長サムネイル",
    href: "/koimiman/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#58c9f3",
    sceneWord: "恋",
  },
  {
    id: "work-15",
    chapter: "15",
    englishTitle: "波瑠の場合・透華の場合・莉乃の場合",
    title: "はれの屋恋日和",
    credit: "製作者：天音しあ",
    description: "夏の海の家『はれの屋』を舞台に、個性豊かなヒロインたちとの交流を描く恋愛ビジュアルノベルシリーズ。波瑠・透華・莉乃、それぞれとのひと夏の恋を描く三作。",
    image: "/media/harenoya/ensemble.png",
    imageAlt: "はれの屋恋日和 海の家で働く透華・波瑠・莉乃",
    href: "/harenoya/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#f3b6c9",
    sceneWord: "晴",
  },
  {
    id: "work-16",
    chapter: "16",
    englishTitle: "",
    title: "博多弁の女を離すな！",
    credit: "製作者：ガンズベリー",
    description: "「せっかくの夏休みやし、一週間ずーっと一緒におれるんよ？　そりゃ楽しみにするに決まっとるやん♪」",
    image: "/media/hakata-riri/cover-no-text-v1.png",
    imageAlt: "博多弁の女を離すな！ 秋月 莉里のサムネイル",
    href: "/hakata-riri/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#79d4f4",
    sceneWord: "秘",
  },
  {
    id: "work-17",
    chapter: "17",
    englishTitle: "",
    title: "肝試されてるのお前じゃん！",
    credit: "製作者：ぽみゃ",
    description: "夏の夜、友人たちと肝試しに訪れた古びた廃校。 そこで出会ったのは、人間を怖がらせることに妙な情熱を燃やす一人の幽霊だった。 脅かして、失敗して、なぜか自分までビビってる。 そんなポンコツ幽霊と真夜中の校内を巡る、ちょっぴりホラーで騒がしい肝試しコメディ！ けれど探索を続けるうち、いつも騒がしい彼がなぜか音楽室だけは避けたがることに気づいて――。",
    image: "/media/kimodameshi/cover-wide-v1.png",
    imageAlt: "廃校の扉から顔を出して笑う榎戸 調の文字なし横長サムネイル",
    href: "/kimodameshi/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#65cceb",
    sceneWord: "幽",
  },
  {
    id: "work-18",
    chapter: "18",
    englishTitle: "",
    title: "水着のあなたに理性限界！？チャラ男・歩夢と余裕ゼロな夏の海",
    credit: "製作者：パトラちゃん",
    description: "2ヶ月前にBARでナンパされてから未だ交際前のジリジリ感……。ハイスペチャラ男の歩夢は、あなたに一目惚れして以来ずっと夢中！猛アタックの末に実現した二人きりの海旅行で、水着姿のあなたを前に彼の理性が限界突破！？普段は完璧な彼が、あなたにだけ余裕をなくして顔を真っ赤にする激甘ギャップストーリー。",
    image: "/media/ayumu-summer/cover-wide-v1.png",
    imageAlt: "夏の海で笑う柳川歩夢の文字なし横長サムネイル",
    href: "/ayumu-summer/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#ffcf45",
    sceneWord: "照",
  },
  {
    id: "work-19",
    chapter: "19",
    englishTitle: "",
    title: "SUMMER FESTIVAL",
    credit: "製作者：ジンJIN2MR",
    description: "ねえ、これってデートじゃないの？ 今年の夏、最後にもう一度――フェスへ行こう",
    image: "/media/summer-festival/cover-wide-v1.png",
    imageAlt: "上段に昴の顔アップ、下段に出演アーティスト5人の顔アップを並べたSUMMER FESTIVALの表紙",
    href: "/summer-festival/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#42c9f5",
    sceneWord: "音",
  },
  {
    id: "work-20",
    chapter: "20",
    englishTitle: "",
    title: nagiseTitle,
    credit: `製作者：${nagiseCreator}`,
    description: nagiseStory.join("\n"),
    image: "/media/namiuchigiwa-genkouhan/cover-wide.png",
    imageAlt: "波打ち際、現行犯。 潮見 凪世の作品一覧サムネイル",
    href: "/namiuchigiwa-genkouhan/",
    external: false,
    side: "right",
    rotate: "2deg",
    accent: "#56c7ef",
    sceneWord: "潮",
  },
  {
    id: "work-21",
    chapter: "21",
    englishTitle: "",
    title: belphegorTitle,
    credit: `製作者：${belphegorCreator}`,
    description: belphegorCardDescription,
    image: "/media/sensei-genkou-dashite/cover-wide-v1.png",
    imageAlt: "こちらへ微笑むベルフェゴールの文字なし横長サムネイル",
    href: "/sensei-genkou-dashite/",
    external: false,
    side: "left",
    rotate: "-2deg",
    accent: "#c4ee4f",
    sceneWord: "怠",
  },
] as const;

const projectBgmTrack = (projectId: string): BgmTrack | undefined => {
  switch (projectId) {
    case "work-01": return "breezy-seaside-romance";
    case "work-02": return "sunny-beach-afternoon";
    case "work-03": return "festival-heartbeat";
    case "work-04": return "sunlit-rivalry";
    case "work-05": return "eternal-blue";
    case "work-06": return "turquoise-terrace";
    case "work-07": return "moonlit-seaside-walk";
    case "work-08": return "neon-pool-reflections";
    case "work-09": return "summer-house-bell";
    case "work-10": return "cicada-summer";
    case "work-11": return "poolside-afternoon";
    case "work-12": return "egao-sunlit-rivalry";
    case "work-13": return "oni-training-candy-forecast";
    case "work-14": return "shiokaze-to-ato-ippo";
    case "work-15": return "harenoya-koi-no-gogo";
    case "work-16": return "kimi-to-isshukan";
    case "work-17": return "ghost-midnight-swing";
    case "work-18": return "yoyu-zero-summer-breeze";
    case "work-19": return "midnight-station-lights";
    case "work-20": return "ocean-police";
    default: return undefined;
  }
};

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const smoothstep = (edge0: number, edge1: number, value: number) => {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

export default function Home() {
  const shellRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playbackRef = useRef<ReturnType<typeof createBackgroundPlayback> | null>(null);
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
    const playback = createBackgroundPlayback(
      video,
      backgroundClips.map(asset),
      () => setIsPaused(true),
    );
    playbackRef.current = playback;
    return () => {
      playback.dispose();
      playbackRef.current = null;
    };
  }, []);

  useEffect(() => {
    playbackRef.current?.setPaused(
      isPaused || prefersReducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    );
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
      if (video.readyState >= 2 && Number.isFinite(video.duration) && video.duration > 0) {
        const edgeDistance = Math.min(
          video.currentTime,
          Math.max(0, video.duration - video.currentTime),
        );
        const loopOpacity = smoothstep(0.08, 0.72, edgeDistance);
        shell.style.setProperty("--video-loop-opacity", loopOpacity.toFixed(3));
      } else {
        shell.style.setProperty("--video-loop-opacity", "0");
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
        <video
          ref={videoRef}
          className="background-video"
          muted
          playsInline
          preload="auto"
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
        <a className="brand" href="#top" onClick={scrollToSection} aria-label="ページ最上部へ">
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
          <a href={`#${project.id}`} onClick={scrollToSection} key={project.id}>
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
          <a className="scroll-cue" href="#work-01" onClick={scrollToSection}>
            <span>SCROLL TO DISCOVER</span>
            <i aria-hidden="true" />
          </a>
        </section>

        {projects.map((project) => {
          const bgmTrack = project.external ? undefined : projectBgmTrack(project.id);

          return (
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
              data-bgm-track={bgmTrack}
              data-bgm-trigger={bgmTrack ? "project-card" : undefined}
              onPointerDown={bgmTrack ? () => void playBgm(bgmTrack) : undefined}
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
                    {bgmTrack ? <p className="project-bgm-hint">BGM / SCROLL TO SWITCH · TAP TO PLAY</p> : null}
                    <Link
                      className="project-link"
                      href={project.href}
                      onClick={bgmTrack ? () => void playBgm(bgmTrack) : undefined}
                    >
                      <span>{project.id === "work-05" ? "12人のキャラクターを見る" : project.id === "work-15" ? "三つの作品紹介を見る" : "作品紹介を見る"}</span>
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
          );
        })}

        <section className="collection" id="collection">
          <div className="collection-heading">
            <p className="eyebrow">COLLABORATION ARCHIVE</p>
            <h2>{projects.length}の夏を、ひとつに。</h2>
            <p>
              作品画像から、それぞれの物語へ。
            </p>
          </div>

          <div className="flowing-gallery" aria-label="コラボ作品一覧">
            <div className="gallery-track">
              {[...projects, ...projects].map((project, index) => {
                const duplicate = index >= projects.length;
                const bgmTrack = project.external ? undefined : projectBgmTrack(project.id);
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
                    data-bgm-trigger={bgmTrack ? "gallery-card" : undefined}
                    onPointerDown={bgmTrack ? () => void playBgm(bgmTrack) : undefined}
                    onClick={bgmTrack ? () => void playBgm(bgmTrack) : undefined}
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
            <a href="#top" onClick={scrollToSection}>BACK TO TOP ↑</a>
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
