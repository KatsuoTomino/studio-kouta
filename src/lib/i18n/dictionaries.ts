import type { Locale } from "@/lib/i18n/config";

export const dictionaries = {
  ja: {
    language: {
      toggle: "言語",
      ja: "日本語",
      en: "English",
    },
    nav: {
      profile: "プロフィール",
      work: "作品",
      main: "メインナビゲーション",
      mobile: "モバイルナビゲーション",
      openMenu: "メニューを開く",
      closeMenu: "メニューを閉じる",
    },
    auth: {
      login: "ログイン",
      logout: "ログアウト",
    },
    common: {
      back: "戻る",
      close: "閉じる",
      contact: "お問い合わせ",
    },
    home: {
      tagline: "絵で伝える、こうたの世界。",
    },
    work: {
      title: "こうたの絵・作品ギャラリー",
      intro: "こうた（Kouta）の絵画とイラスト。オンラインでご覧いただけます。",
    },
    profile: {
      title: "こうたのプロフィール",
      intro: "沖縄で制作する14歳のアーティストこうたです。",
    },
    hero: {
      noSlides: "スライドはまだありません。",
    },
    lightbox: {
      exhibitSuffix: "の展示",
    },
  },
  en: {
    language: {
      toggle: "Language",
      ja: "日本語",
      en: "English",
    },
    nav: {
      profile: "Profile",
      work: "Work",
      main: "Main navigation",
      mobile: "Mobile navigation",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    auth: {
      login: "Login",
      logout: "Logout",
    },
    common: {
      back: "Back",
      close: "Close",
      contact: "Contact",
    },
    home: {
      tagline: "Kouta's world, told through painting.",
    },
    work: {
      title: "Kouta's paintings and gallery",
      intro: "Paintings and illustrations by Kouta. View them online.",
    },
    profile: {
      title: "Kouta's profile",
      intro: "Kouta is a 14-year-old artist creating in Okinawa.",
    },
    hero: {
      noSlides: "No hero slides yet.",
    },
    lightbox: {
      exhibitSuffix: " exhibition",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionarySync(locale: Locale): Dictionary {
  return dictionaries[locale];
}
