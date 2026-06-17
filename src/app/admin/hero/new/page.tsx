import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { HeroSlideForm } from "@/components/admin/HeroSlideForm";
import { Footer } from "@/components/lp/Footer";
import { createHeroSlideAction } from "@/lib/actions/hero-slides";

export default function NewHeroSlidePage() {
  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <AdminPageHeader
          title="Add Hero Slide"
          backHref="/admin/hero"
        />

        <section className="border border-hairline bg-canvas p-xl">
          <HeroSlideForm mode="create" action={createHeroSlideAction} />
        </section>
      </main>
      <Footer />
    </>
  );
}
