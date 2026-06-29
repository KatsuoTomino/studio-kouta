import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo/site-url";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/login", "/sign-up", "/api/", "/auth/"],
    },
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
