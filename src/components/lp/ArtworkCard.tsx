"use client";

import Image from "next/image";
import type { Artwork } from "@/data/artworks";
import { ArtworkEditLink } from "@/components/admin/ArtworkEditLink";

type ArtworkCardProps = {
  artwork: Artwork;
  onSelect: (artwork: Artwork) => void;
};

export function ArtworkCard({ artwork, onSelect }: ArtworkCardProps) {
  return (
    <article className="group relative flex h-full flex-col border border-hairline bg-canvas transition-colors hover:border-stone">
      <ArtworkEditLink artworkId={artwork.id} />
      <button
        type="button"
        onClick={() => onSelect(artwork)}
        className="flex h-full flex-col text-left"
      >
        <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface-card">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02] motion-reduce:group-hover:scale-100"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>

        <div className="flex flex-1 flex-col gap-xs p-lg">
          <h3 className="text-body-strong text-ink">{artwork.title}</h3>
          <time
            dateTime={artwork.date}
            className="text-caption-md text-mute"
          >
            {artwork.date}
          </time>
          <p className="mt-xs line-clamp-3 text-body-sm leading-relaxed text-body">
            {artwork.comment}
          </p>
        </div>
      </button>
    </article>
  );
}
