import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { Hero } from "@/components/lp/Hero";
import { listArtworks } from "@/lib/turso/artworks";
import { listHeroSlides } from "@/lib/turso/hero-slides";
import { getProfile } from "@/lib/turso/profile";

export default async function Home() {
  const [artworks, profile, heroSlides] = await Promise.all([
    listArtworks(),
    getProfile(),
    listHeroSlides(),
  ]);

  return (
    <>
      <Hero slides={heroSlides} profile={profile} />
      <Gallery artworks={artworks} />
      <Footer />
    </>
  );
}
