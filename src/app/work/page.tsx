import type { Metadata } from "next";
import { BackButton } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { Gallery } from "@/components/lp/Gallery";
import { listArtworks } from "@/lib/turso/artworks";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Studio Kouta の作品ギャラリー。絵が、部屋にいる。オンライン展示の作品一覧。",
  alternates: {
    canonical: "/work",
  },
};

export default async function WorkPage() {
  const artworks = await listArtworks();

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <div className="relative mb-lg min-h-10">
          <h1 className="text-center font-display text-heading-xl text-ink">
            Studio Kouta の作品
          </h1>
          <div className="absolute right-0 top-0">
            <BackButton />
          </div>
        </div>
      </main>
      <Gallery artworks={artworks} />
      <Footer />
    </>
  );
}
