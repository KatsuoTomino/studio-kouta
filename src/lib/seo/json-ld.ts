import {
  DEFAULT_DESCRIPTION,
  getSiteUrl,
  SITE_NAME,
} from "@/lib/seo/site-url";

export function getBrandJsonLd() {
  const siteUrl = getSiteUrl();
  const sameAs = [
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
  ].filter((url): url is string => Boolean(url));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: SITE_NAME,
        url: siteUrl,
        description: DEFAULT_DESCRIPTION,
        inLanguage: "ja",
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: SITE_NAME,
        url: siteUrl,
        description: DEFAULT_DESCRIPTION,
        ...(sameAs.length > 0 ? { sameAs } : {}),
      },
    ],
  };
}
