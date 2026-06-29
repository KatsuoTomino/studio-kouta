/** 本番URLの基準。NEXT_PUBLIC_SITE_URL > VERCEL_URL > localhost */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (configured) return configured;

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const SITE_NAME = "Studio Kouta";

export const DEFAULT_DESCRIPTION =
  "絵が、部屋にいる。Studio Kouta のオンライン展示";

export const DEFAULT_TITLE = `${SITE_NAME} | 絵が、部屋にいる。`;
