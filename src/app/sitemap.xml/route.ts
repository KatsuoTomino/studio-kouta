import { getSiteUrl } from "@/lib/seo/site-url";

// Route Handler で配信する。
// MetadataRoute.Sitemap だと Content-Disposition 付きになり、
// Google Search Console が「サイトマップを読み込めませんでした」になる事例がある。
// https://github.com/vercel/next.js/issues/51649
export const dynamic = "force-static";

export function GET() {
  const baseUrl = getSiteUrl();
  const lastmod = new Date().toISOString().slice(0, 10);

  const entries = [
    { loc: baseUrl, changefreq: "weekly", priority: "1.0" },
    { loc: `${baseUrl}/work`, changefreq: "weekly", priority: "0.9" },
    { loc: `${baseUrl}/profile`, changefreq: "monthly", priority: "0.8" },
  ];

  const urls = entries
    .map(
      (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
