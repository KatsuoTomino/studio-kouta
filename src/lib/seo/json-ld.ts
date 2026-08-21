import {
  ARTIST_NAME_EN,
  ARTIST_NAME_JA,
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  INSTAGRAM_URL,
  SITE_NAME,
} from "@/lib/seo/site-url";

export function getBrandJsonLd() {
  const siteUrl = getSiteUrl();
  const sameAs = [INSTAGRAM_URL].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        alternateName: ["スタジオこうた", "スタジオコウタ", "Studio Kouta Okinawa"],
        url: siteUrl,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "ja",
        publisher: { "@id": `${siteUrl}/#person` },
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: ARTIST_NAME_JA,
        alternateName: [ARTIST_NAME_EN, "コウタ", "Kota", SITE_NAME],
        url: siteUrl,
        description: DEFAULT_DESCRIPTION,
        jobTitle: "アーティスト",
        homeLocation: {
          "@type": "Place",
          name: "沖縄県",
        },
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };
}
