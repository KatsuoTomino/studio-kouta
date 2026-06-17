export type Artwork = {
  id: string;
  title: string;
  date: string;
  comment: string;
  imageUrl: string;
  imageKey?: string;
  width: number;
  height: number;
};

export type Profile = {
  name: string;
  imageUrl: string;
  bio: string;
};

export type { HeroSlide } from "@/types/hero-slide";
import type { HeroSlide } from "@/types/hero-slide";

/** 白黒基調のシンプルなキャラクターイラスト（DiceBear Notionists） */
function characterImage(seed: string, size = 800) {
  const params = new URLSearchParams({
    seed,
    size: String(size),
    backgroundColor: "f6f6f3",
  });
  return `https://api.dicebear.com/9.x/notionists/png?${params.toString()}`;
}

export const profile: Profile = {
  name: "Kouta",
  imageUrl: characterImage("kouta-profile", 400),
  bio: "Artist and illustrator based in Tokyo. Studio Kouta is my online gallery — a small room where paintings hang on the walls and wait for you to look a little closer.",
};

export const artworks: Artwork[] = [
  {
    id: "morning-light",
    title: "朝の光",
    date: "2025.03",
    comment:
      "窓から差し込む光と、まだ眠たい空気。色がゆっくり目を覚ます瞬間を描きました。",
    imageUrl: characterImage("morning-light"),
    width: 800,
    height: 800,
  },
  {
    id: "city-dream",
    title: "街の夢",
    date: "2024.11",
    comment:
      "歩いていると見えてくる、ちょっとだけ歪んだ風景。現実と想像の境目。",
    imageUrl: characterImage("city-dream"),
    width: 800,
    height: 800,
  },
  {
    id: "quiet-room",
    title: "静かな部屋",
    date: "2025.01",
    comment: "誰もいない部屋に、絵だけが残っている。そんな午後の記憶。",
    imageUrl: characterImage("quiet-room"),
    width: 800,
    height: 800,
  },
  {
    id: "summer-palette",
    title: "夏のパレット",
    date: "2024.07",
    comment: "暑い日の色を、そのままキャンバスに置いた作品。",
    imageUrl: characterImage("summer-palette"),
    width: 800,
    height: 800,
  },
  {
    id: "floating-shapes",
    title: "浮かぶかたち",
    date: "2025.02",
    comment: "形がふわっと漂う感覚。見ているうちに、形が変わっていく。",
    imageUrl: characterImage("floating-shapes"),
    width: 800,
    height: 800,
  },
  {
    id: "night-garden",
    title: "夜の庭",
    date: "2023.09",
    comment: "月明かりの下で、植物が別の色をしているような夜。",
    imageUrl: characterImage("night-garden"),
    width: 800,
    height: 800,
  },
  {
    id: "paper-sky",
    title: "紙の空",
    date: "2024.05",
    comment: "折り紙のように重なった雲。子どもの頃の空を思い出す。",
    imageUrl: characterImage("paper-sky"),
    width: 800,
    height: 800,
  },
  {
    id: "color-whisper",
    title: "色のささやき",
    date: "2025.04",
    comment: "小さな色の変化が、画面いっぱいに広がっていく。",
    imageUrl: characterImage("color-whisper"),
    width: 800,
    height: 800,
  },
  {
    id: "window-seat",
    title: "窓辺",
    date: "2023.12",
    comment: "座って眺めるだけの時間。そこにある日常の美しさ。",
    imageUrl: characterImage("window-seat"),
    width: 800,
    height: 800,
  },
];

export const heroSlides: HeroSlide[] = artworks.slice(0, 6).map((artwork) => ({
  id: artwork.id,
  imageUrl: artwork.imageUrl,
  alt: artwork.title,
}));
