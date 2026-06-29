/** Search Console「HTML タグ」方式の content 値 */
export function getGoogleSiteVerification(): string {
  const fromEnv = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim();
  if (fromEnv) return fromEnv;

  return "gZOvT4mg_zH3r-e0w9jvKcBdKYwyKTGWZz_U5mCYXCA";
}
