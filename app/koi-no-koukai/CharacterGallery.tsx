"use client";

/* eslint-disable @next/next/no-img-element -- Static export uses base-path-aware public images. */

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Paperclip } from "lucide-react";
import styles from "./cruise.module.css";

type Character = {
  id: string;
  number: string;
  name: string;
  reading: string;
  age: number;
  occupation: string;
  image: string;
  alt: string;
  bio: string;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const asset = (path: string) => `${basePath}${path}`;

const characters: Character[] = [
  {
    id: "garu",
    number: "01",
    name: "牙琉",
    reading: "がる",
    age: 22,
    occupation: "バーテンダー",
    image: "/media/koi-no-voyage/characters/garu.jpg",
    alt: "豪華客船を背に港に立つ、黒髪と銀のピアスが特徴の牙琉",
    bio: "人の感情を鋭く読む、低い声のバーテンダー。挑発的でつかみどころがないが、ふとした瞬間に優しさが覗く。",
  },
  {
    id: "toma",
    number: "02",
    name: "冬真",
    reading: "とうま",
    age: 24,
    occupation: "法学院生",
    image: "/media/koi-no-voyage/characters/toma.jpg",
    alt: "豪華客船を背にした港で白いシャツと銀縁眼鏡を身につけた冬真",
    bio: "礼儀正しく気配りも完璧な法学院生。穏やかな微笑みの奥に、物事を自分の手で動かしたい強さを秘める。",
  },
  {
    id: "moka",
    number: "03",
    name: "もか",
    reading: "もか",
    age: 20,
    occupation: "パティシエ志望",
    image: "/media/koi-no-voyage/characters/moka.jpg",
    alt: "豪華客船を背にした港で黄色いジャケットを着た、小柄なもか",
    bio: "パティシエを目指す、人懐っこく一途な青年。お菓子と袖をつかむ仕草で、言葉より先に好意を伝える。",
  },
  {
    id: "sazanami",
    number: "04",
    name: "漣",
    reading: "さざなみ",
    age: 21,
    occupation: "文学部生兼作曲家",
    image: "/media/koi-no-voyage/characters/sazanami.jpg",
    alt: "豪華客船のそばで黒い服と片耳のイヤホンを身につけた漣",
    bio: "無口で淡々とした文学部生兼作曲家。人の小さな変化に敏感で、言葉にできない感情を音楽へ託す。",
  },
  {
    id: "so",
    number: "05",
    name: "騒",
    reading: "そう",
    age: 23,
    occupation: "サーフショップ店員",
    image: "/media/koi-no-voyage/characters/so.jpg",
    alt: "豪華客船を背にアロハシャツ姿で立つ、日焼けした金髪の騒",
    bio: "太陽のようなムードメーカー。誰より大きな声で場を動かす一方、静かな夜には繊細な素顔を隠す。",
  },
  {
    id: "iori",
    number: "06",
    name: "伊織",
    reading: "いおり",
    age: 22,
    occupation: "元子役",
    image: "/media/koi-no-voyage/characters/iori.jpg",
    alt: "豪華客船を背に黒い服と赤いストールを身につけた伊織",
    bio: "完璧な笑顔と美しい所作で人を惹きつける元子役。長く演じ続けたことで、演じる自分と本心の境界に揺れている。",
  },
  {
    id: "tsuyuri",
    number: "07",
    name: "つゆり",
    reading: "つゆり",
    age: 18,
    occupation: "最年少参加者",
    image: "/media/koi-no-voyage/characters/tsuyuri.jpg",
    alt: "豪華客船を背にした港で白いワンピースを着た長い黒髪のつゆり",
    bio: "高校を卒業したばかりの最年少。恋愛はまだ未経験で控えめだが、航海の中で少しずつ自分の意志を育てていく。",
  },
  {
    id: "kyoka",
    number: "08",
    name: "棘",
    reading: "きょか",
    age: 21,
    occupation: "看護学生",
    image: "/media/koi-no-voyage/characters/kyoka.jpg",
    alt: "豪華客船を背に赤茶のツインテールと赤い服が印象的な棘",
    bio: "毒舌で正論をぶつける一方、誰より真面目で面倒見のよい看護学生。照れると声が裏返り、髪をいじる。",
  },
  {
    id: "mahoro",
    number: "09",
    name: "まほろ",
    reading: "まほろ",
    age: 23,
    occupation: "保育士",
    image: "/media/koi-no-voyage/characters/mahoro.jpg",
    alt: "豪華客船を背に緑のスカートと優しい笑顔が印象的なまほろ",
    bio: "穏やかで包容力があり、いつも人を世話する側の保育士。優しさの奥に、自分も誰かに甘えたい寂しさを抱える。",
  },
  {
    id: "kotori",
    number: "10",
    name: "ことり",
    reading: "ことり",
    age: 20,
    occupation: "花屋店員",
    image: "/media/koi-no-voyage/characters/kotori.jpg",
    alt: "豪華客船と青い海を背に、肩に黄緑のインコ「ぴの」を乗せたことり",
    bio: "肩のインコ「ぴの」と語り合う、不思議な感性の花屋店員。空気を外しながらも、ふと人の核心を突く。",
  },
  {
    id: "shiori",
    number: "11",
    name: "汐莉",
    reading: "しおり",
    age: 22,
    occupation: "元ビーチバレー選手",
    image: "/media/koi-no-voyage/characters/shiori.jpg",
    alt: "夕陽と豪華客船を背にスポーティーな服装で立つ汐莉",
    bio: "膝の怪我で引退した元ビーチバレー選手。頼れる姉御肌で言葉は直球だが、恋愛になると途端に奥手。",
  },
  {
    id: "kirara",
    number: "12",
    name: "きらら",
    reading: "きらら",
    age: 21,
    occupation: "インフルエンサー",
    image: "/media/koi-no-voyage/characters/kirara.jpg",
    alt: "豪華客船と夕日を背にプラチナピンクの巻き髪で立つきらら",
    bio: "フォロワー30万人のインフルエンサー。「可愛い」を鎧に明るく振る舞いながら、素顔の自分への不安を抱える。",
  },
];

export default function CharacterGallery() {
  const [activeId, setActiveId] = useState(characters[0].id);
  const activeCharacter =
    characters.find((character) => character.id === activeId) ?? characters[0];

  const selectCharacter = (id: string) => setActiveId(id);

  return (
    <div className={styles.pageShell}>
      <div className={styles.background} aria-hidden="true">
        <img
          src={asset("/media/koi-no-voyage/cover-card.jpg")}
          alt=""
        />
        <span />
      </div>

      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span>SUMMER COLLAB</span>
          <small>2026</small>
        </Link>
        <Link className={styles.backLink} href="/">
          <ArrowLeft aria-hidden="true" size={18} strokeWidth={1.35} />
          <span>作品一覧へ戻る</span>
        </Link>
      </header>

      <main className={styles.main}>
        <section className={styles.characterStage}>
          <div className={styles.portraitColumn}>
            <figure className={styles.portraitFrame}>
              <Paperclip
                className={styles.paperclip}
                aria-hidden="true"
                size={72}
                strokeWidth={1.25}
              />
              <img
                key={activeCharacter.id}
                className={styles.portrait}
                src={asset(activeCharacter.image)}
                alt={activeCharacter.alt}
              />
            </figure>
          </div>

          <div className={styles.copyColumn}>
            <div className={styles.workHeading}>
              <p>CHARACTER INTRODUCTION</p>
              <h1>
                恋の航海
                <span>~Voyage on the Eternal Blue~</span>
              </h1>
              <p className={styles.creator}>製作者：ガルヒロ</p>
              <p className={styles.externalLink}><a href="https://kyarapu.com/detail/6aa2a04184523144c00cad7f" target="_blank" rel="noreferrer" aria-label="キャラぷで「恋の航海」を開く（新しいタブ）">キャラぷで作品を開く <span aria-hidden="true">↗</span></a></p>
              <p className={styles.introduction}>
                豪華クルーズ船「エターナル・ブルー号」に集まった、
                個性豊かな男女12人。恋と嘘が揺れ動く7日間の航海へ。
              </p>
            </div>

            <article
              className={styles.characterCopy}
              id="character-preview"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className={styles.characterNumber}>{activeCharacter.number}</p>
              <div className={styles.nameLine}>
                <h2>{activeCharacter.name}</h2>
                <span>{activeCharacter.reading}</span>
              </div>
              <p className={styles.characterMeta}>
                {activeCharacter.age}歳 <span>/</span> {activeCharacter.occupation}
              </p>
              <p className={styles.characterBio}>{activeCharacter.bio}</p>
            </article>
          </div>
        </section>

        <section className={styles.selector} aria-labelledby="character-selector-title">
          <div className={styles.selectorHeading}>
            <h2 id="character-selector-title">人物を選ぶ</h2>
            <p>HOVER OR TAP</p>
            <span aria-hidden="true" />
          </div>

          <div className={styles.thumbnailRail}>
            {characters.map((character) => {
              const selected = character.id === activeCharacter.id;

              return (
                <button
                  className={styles.thumbnailButton}
                  data-character-card={character.id}
                  type="button"
                  key={character.id}
                  aria-controls="character-preview"
                  aria-pressed={selected}
                  onMouseEnter={() => selectCharacter(character.id)}
                  onFocus={() => selectCharacter(character.id)}
                  onClick={() => selectCharacter(character.id)}
                >
                  <span className={styles.thumbnailImage}>
                    <img src={asset(character.image)} alt="" loading="lazy" />
                  </span>
                  <span className={styles.thumbnailName}>{character.name}</span>
                </button>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
