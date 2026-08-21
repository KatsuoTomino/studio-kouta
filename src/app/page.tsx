import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { Hero } from "@/components/lp/Hero";
import { getDictionary, getLocale } from "@/lib/i18n/get-locale";
import { toDisplayArtwork } from "@/lib/i18n/localized";
import { listArtworks } from "@/lib/turso/artworks";
import { listHeroSlides } from "@/lib/turso/hero-slides";
import { getProfile } from "@/lib/turso/profile";

export default async function Home() {
  const [artworks, profile, heroSlides, dict, locale] = await Promise.all([
    listArtworks(),
    getProfile(),
    listHeroSlides(),
    getDictionary(),
    getLocale(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} profile={profile} />
      <Gallery
        artworks={artworks.map((artwork) => toDisplayArtwork(artwork, locale))}
        closeLabel={dict.common.close}
        exhibitSuffix={dict.lightbox.exhibitSuffix}
      />
      <Footer />
    </>
  );
}
