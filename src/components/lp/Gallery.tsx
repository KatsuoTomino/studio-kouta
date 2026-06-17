"use client";

import { useState } from "react";
import type { Artwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";
import { Lightbox } from "./Lightbox";

type GalleryProps = {
  artworks: Artwork[];
};

export function Gallery({ artworks }: GalleryProps) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <section id="gallery" className="border-t border-hairline-soft px-lg pb-section pt-section">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-1 gap-lg sm:grid-cols-2 lg:grid-cols-3">
          {artworks.map((artwork) => (
            <ArtworkCard
              key={artwork.id}
              artwork={artwork}
              onSelect={setSelected}
            />
          ))}
        </div>
      </div>

      <Lightbox artwork={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
