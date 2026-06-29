import type { MetadataRoute } from "next";
import { listArtworks } from "@/lib/turso/artworks";
import { getSiteUrl } from "@/lib/seo/site-url";

function parseArtworkDate(date: string): Date | null {
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function getLatestArtworkDate(artworks: { date: string }[]): Date | undefined {
  let latest: Date | undefined;

  for (const artwork of artworks) {
    const parsed = parseArtworkDate(artwork.date);
    if (!parsed) continue;
    if (!latest || parsed > latest) latest = parsed;
  }

  return latest;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getSiteUrl();
  const artworks = await listArtworks();
  const lastModified = getLatestArtworkDate(artworks) ?? new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/work`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/profile`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
