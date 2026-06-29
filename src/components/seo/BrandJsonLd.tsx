import { getBrandJsonLd } from "@/lib/seo/json-ld";

export function BrandJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getBrandJsonLd()) }}
    />
  );
}
