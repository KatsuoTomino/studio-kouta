import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { Hero } from "@/components/lp/Hero";
import { profile } from "@/data/artworks";
import { listArtworks } from "@/lib/turso/artworks";

export default async function Home() {
  const artworks = await listArtworks();

  const heroSlides = artworks.slice(0, 6).map((artwork) => ({
    id: artwork.id,
    imageUrl: artwork.imageUrl,
    alt: artwork.title,
  }));

  return (
    <>
      <Hero slides={heroSlides} profile={profile} />
      <Gallery artworks={artworks} />
      <Footer />
    </>
  );
}
