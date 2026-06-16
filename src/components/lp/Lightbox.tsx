"use client";

import Image from "next/image";
import { useEffect } from "react";
import type { Artwork } from "@/data/artworks";

type LightboxProps = {
  artwork: Artwork | null;
  onClose: () => void;
};

export function Lightbox({ artwork, onClose }: LightboxProps) {
  useEffect(() => {
    if (!artwork) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 p-lg backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${artwork.title}の展示`}
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-lg bg-canvas p-lg shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-lg top-lg z-10 flex size-10 items-center justify-center rounded-md bg-surface-card text-ink transition-colors hover:bg-hairline-soft"
          aria-label="閉じる"
        >
          ✕
        </button>

        <div className="overflow-hidden rounded-md">
          <Image
            src={artwork.imageUrl}
            alt={artwork.title}
            width={artwork.width}
            height={artwork.height}
            className="h-auto max-h-[60vh] w-full object-contain"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </div>

        <div className="mt-lg">
          <h3 className="font-display text-heading-xl text-ink">
            {artwork.title}
          </h3>
          <p className="mt-xs text-body-sm text-mute">{artwork.date}</p>
          <p className="mt-md text-body-md leading-relaxed text-body">
            {artwork.comment}
          </p>
        </div>
      </div>
    </div>
  );
}
