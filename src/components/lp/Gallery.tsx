"use client";

import { useEffect, useState } from "react";
import type { DisplayArtwork } from "@/types/artwork";
import { ArtworkCard } from "./ArtworkCard";
import { Lightbox } from "./Lightbox";

type GalleryProps = {
  artworks: DisplayArtwork[];
  closeLabel: string;
  exhibitSuffix: string;
};

export function Gallery({ artworks, closeLabel, exhibitSuffix }: GalleryProps) {
  const [selected, setSelected] = useState<DisplayArtwork | null>(null);

  useEffect(() => {
    setSelected((current) => {
      if (!current) return null;
      return artworks.find((artwork) => artwork.id === current.id) ?? null;
    });
  }, [artworks]);

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

      <Lightbox
        artwork={selected}
        onClose={() => setSelected(null)}
        closeLabel={closeLabel}
        exhibitSuffix={exhibitSuffix}
      />
    </section>
  );
}
