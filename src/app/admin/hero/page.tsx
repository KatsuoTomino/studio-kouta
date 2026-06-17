import Image from "next/image";
import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Footer } from "@/components/lp/Footer";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { listHeroSlideRecords } from "@/lib/turso/hero-slides";

export default async function AdminHeroPage() {
  const slides = await listHeroSlideRecords();

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <AdminPageHeader
          title="Hero Animation"
          description={
            <>
              {slides.length} slide{slides.length === 1 ? "" : "s"} for the home
              page animation
            </>
          }
          action={
            <Link href="/admin/hero/new" className={outlineAuthButtonClass}>
              Add Slide
            </Link>
          }
        />

        {slides.length === 0 ? (
          <p className="text-body-md text-mute">
            No hero slides yet.{" "}
            <Link href="/admin/hero/new" className="text-ink underline">
              Add Slide
            </Link>
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3">
            {slides.map((slide, index) => (
              <li key={slide.id}>
                <article className="flex h-full flex-col border border-hairline bg-canvas transition-colors hover:border-stone">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-card">
                    <Image
                      src={slide.imageUrl}
                      alt={`Hero slide ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-xs p-lg">
                    <h2 className="text-body-strong text-ink">
                      Slide {index + 1}
                    </h2>
                    <Link
                      href={`/admin/hero/${slide.id}/edit`}
                      className={`mt-md self-start ${outlineAuthButtonClass}`}
                    >
                      Edit
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </>
  );
}
