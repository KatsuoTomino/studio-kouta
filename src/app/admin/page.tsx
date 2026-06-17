import Image from "next/image";
import Link from "next/link";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { listArtworks } from "@/lib/turso/artworks";

export default async function AdminPage() {
  const artworks = await listArtworks();

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <BackLink />
        <div className="flex flex-wrap items-end justify-between gap-md">
          <div>
            <h1 className="font-display text-heading-xl text-ink">Admin</h1>
            <p className="mt-lg text-body-md text-mute">
              {artworks.length} artwork{artworks.length === 1 ? "" : "s"}
            </p>
          </div>
          <Link href="/admin/artworks/new" className={outlineAuthButtonClass}>
            Add Artwork
          </Link>
        </div>

        {artworks.length === 0 ? (
          <p className="mt-xl text-body-md text-mute">
            No artworks yet.{" "}
            <Link href="/admin/artworks/new" className="text-ink underline">
              Add Artwork
            </Link>
          </p>
        ) : (
          <ul className="mt-xl grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3">
            {artworks.map((artwork) => (
              <li key={artwork.id}>
                <article className="flex h-full flex-col border border-hairline bg-canvas transition-colors hover:border-stone">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-card">
                    <Image
                      src={artwork.imageUrl}
                      alt={artwork.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-xs p-lg">
                    <h2 className="text-body-strong text-ink">{artwork.title}</h2>
                    <time
                      dateTime={artwork.date}
                      className="text-caption-md text-mute"
                    >
                      {artwork.date}
                    </time>
                    <Link
                      href={`/admin/artworks/${artwork.id}/edit`}
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
