import type { Metadata } from "next";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { listArtworks } from "@/lib/turso/artworks";
import { getDictionary, getLocale } from "@/lib/i18n/get-locale";
import { toDisplayArtwork } from "@/lib/i18n/localized";
import {
  WORK_PAGE_DESCRIPTION,
  WORK_PAGE_TITLE,
} from "@/lib/seo/site-url";

export const metadata: Metadata = {
  title: WORK_PAGE_TITLE,
  description: WORK_PAGE_DESCRIPTION,
  openGraph: {
    title: WORK_PAGE_TITLE,
    description: WORK_PAGE_DESCRIPTION,
  },
  twitter: {
    title: WORK_PAGE_TITLE,
    description: WORK_PAGE_DESCRIPTION,
  },
  alternates: {
    canonical: "/work",
  },
};

export default async function WorkPage() {
  const [artworks, dict, locale] = await Promise.all([
    listArtworks(),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <BackLink />
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-heading-xl text-ink">
            {dict.work.title}
          </h1>
          <p className="mt-md text-body-md leading-relaxed text-mute">
            {dict.work.intro}
          </p>
        </div>
      </main>
      <Gallery
        artworks={artworks.map((artwork) => toDisplayArtwork(artwork, locale))}
        closeLabel={dict.common.close}
        exhibitSuffix={dict.lightbox.exhibitSuffix}
      />
      <Footer />
    </>
  );
}
