import type { Locale } from "@/lib/i18n/config";
import type { Artwork, DisplayArtwork } from "@/types/artwork";
import type { Profile } from "@/types/profile";

export function pickLocalized(ja: string, en: string, locale: Locale): string {
  const preferred = locale === "en" ? en : ja;
  const fallback = locale === "en" ? ja : en;
  return preferred.trim() || fallback.trim();
}

export function toDisplayArtwork(
  artwork: Artwork,
  locale: Locale,
): DisplayArtwork {
  return {
    id: artwork.id,
    title: pickLocalized(artwork.titleJa, artwork.titleEn, locale),
    comment: pickLocalized(artwork.commentJa, artwork.commentEn, locale),
    date: artwork.date,
    imageUrl: artwork.imageUrl,
    imageKey: artwork.imageKey,
    width: artwork.width,
    height: artwork.height,
  };
}

export function localizedProfileBio(profile: Profile, locale: Locale): string {
  return pickLocalized(profile.bioJa, profile.bioEn, locale);
}

export function artworkAdminLabel(artwork: Artwork): string {
  return artwork.titleJa.trim() || artwork.titleEn.trim();
}
