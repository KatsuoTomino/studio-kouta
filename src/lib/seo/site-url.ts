/** 本番URLの基準。NEXT_PUBLIC_SITE_URL > VERCEL_URL > localhost */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_NAME = "Studio Kouta";

/** アーティスト表記（検索用の自然な別名） */
export const ARTIST_NAME_JA = "こうた";
export const ARTIST_NAME_EN = "Kouta";

/**
 * トップの title / description。
 * キャッチコピーは「こうたワールドへようこそ！」。沖縄・年齢は description 側で自然に補足。
 */
export const DEFAULT_TITLE = `${SITE_NAME} | こうたワールドへようこそ！`;

export const DEFAULT_DESCRIPTION =
  `こうたワールドへようこそ！沖縄の少年アーティスト・${ARTIST_NAME_JA}（${ARTIST_NAME_EN}）の絵画とイラストをオンライン展示する ${SITE_NAME}。`;

export const HOME_TAGLINE = `こうたワールドへようこそ！`;

export const WORK_PAGE_TITLE = `${ARTIST_NAME_JA}の絵・アート作品ギャラリー`;

export const WORK_PAGE_DESCRIPTION =
  `${SITE_NAME}（スタジオこうた）の作品ギャラリー。${ARTIST_NAME_JA}の絵画・イラスト・アート作品を公開しています。`;

export const WORK_PAGE_INTRO =
  `${ARTIST_NAME_JA}（${ARTIST_NAME_EN}）の絵画とイラスト。オンラインでご覧いただけます。`;

export const PROFILE_PAGE_TITLE = `${ARTIST_NAME_JA}のプロフィール`;

export const PROFILE_PAGE_FALLBACK_DESCRIPTION =
  `沖縄在住の少年アーティスト・${ARTIST_NAME_JA}（${ARTIST_NAME_EN}）のプロフィール | ${SITE_NAME}`;

export const PROFILE_PAGE_INTRO =
  `沖縄で制作する14歳のアーティスト${ARTIST_NAME_JA}です。`;
