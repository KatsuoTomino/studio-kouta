import { ArtworkForm } from "@/components/admin/ArtworkForm";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { createArtworkAction } from "@/lib/actions/artworks";

export default function NewArtworkPage() {
  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <BackLink />
        <h1 className="font-display text-heading-xl text-ink">Add Artwork</h1>
        <p className="mt-lg max-w-2xl text-body-md leading-relaxed text-mute">
          Upload an image and enter the artwork details. Images are stored in
          R2 and metadata is saved to Turso.
        </p>

        <section className="mt-xl border border-hairline bg-canvas p-xl">
          <ArtworkForm mode="create" action={createArtworkAction} />
        </section>
      </main>
      <Footer />
    </>
  );
}
