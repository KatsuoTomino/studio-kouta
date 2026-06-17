import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroSlideForm } from "@/components/admin/HeroSlideForm";
import { Footer } from "@/components/lp/Footer";
import {
  deleteHeroSlideAction,
  updateHeroSlideAction,
} from "@/lib/actions/hero-slides";
import { getHeroSlide } from "@/lib/turso/hero-slides";

type EditHeroSlidePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditHeroSlidePage({
  params,
}: EditHeroSlidePageProps) {
  const { id } = await params;
  const slide = await getHeroSlide(id);

  if (!slide) {
    notFound();
  }

  const updateAction = updateHeroSlideAction.bind(null, id);
  const deleteAction = deleteHeroSlideAction.bind(null, id);

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <AdminPageHeader
          title="Edit Hero Slide"
          backHref="/admin/hero"
          description={`Slide ${slide.sortOrder + 1}`}
        />

        <section className="border border-hairline bg-canvas p-xl">
          <HeroSlideForm
            mode="edit"
            slide={slide}
            action={updateAction}
            deleteAction={deleteAction}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
