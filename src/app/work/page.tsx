import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { listArtworks } from "@/lib/turso/artworks";

export default async function WorkPage() {
  const artworks = await listArtworks();

  return (
    <>
      <main className="mx-auto max-w-5xl px-lg pt-section">
        <h1 className="text-center font-display text-heading-xl text-ink">Work</h1>
      </main>
      <Gallery artworks={artworks} />
      <Footer />
    </>
  );
}
