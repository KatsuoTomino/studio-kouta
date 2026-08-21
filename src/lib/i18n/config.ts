export const LOCALES = ["ja", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ja";

export const LOCALE_COOKIE = "locale";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "ja" || value === "en";
}
