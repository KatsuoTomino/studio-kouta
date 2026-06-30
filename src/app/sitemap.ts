import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

// Static sitemap — no DB calls so Googlebot always gets a fast 200 response.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const lastModified = new Date();

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
