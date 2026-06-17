import { notFound } from "next/navigation";
import { ArtworkForm } from "@/components/admin/ArtworkForm";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import {
  deleteArtworkAction,
  updateArtworkAction,
} from "@/lib/actions/artworks";
import { getArtwork } from "@/lib/turso/artworks";

type EditArtworkPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditArtworkPage({ params }: EditArtworkPageProps) {
  const { id } = await params;
  const artwork = await getArtwork(id);

  if (!artwork) {
    notFound();
  }

  const updateAction = updateArtworkAction.bind(null, id);
  const deleteAction = deleteArtworkAction.bind(null, id);

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <BackLink />
        <h1 className="font-display text-heading-xl text-ink">Edit Artwork</h1>
        <p className="mt-lg text-body-md text-mute">{artwork.title}</p>

        <section className="mt-xl border border-hairline bg-canvas p-xl">
          <ArtworkForm
            mode="edit"
            artwork={artwork}
            action={updateAction}
            deleteAction={deleteAction}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
