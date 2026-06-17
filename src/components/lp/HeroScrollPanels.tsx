"use client";

import Image from "next/image";
import type { HeroSlide } from "@/types/hero-slide";

type HeroScrollPanelsProps = {
  slides: HeroSlide[];
};

export function HeroScrollPanels({ slides }: HeroScrollPanelsProps) {
  if (slides.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-lg text-center text-body-sm text-mute">
        No hero slides yet.
      </div>
    );
  }

  const loopSlides = [...slides, ...slides];

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="flex h-full w-max animate-hero-scroll gap-sm motion-reduce:hidden">
        {loopSlides.map((slide, index) => (
          <div
            key={`${slide.id}-${index}`}
            className="relative h-full w-[30vw] min-w-[200px] max-w-[320px] shrink-0 overflow-hidden"
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="320px"
              priority={index < 3}
            />
          </div>
        ))}
      </div>

      <div className="hero-scroll-manual hidden h-full w-full snap-x snap-mandatory gap-sm overflow-x-auto motion-reduce:flex">
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative h-full w-[30vw] min-w-[200px] max-w-[320px] shrink-0 snap-center overflow-hidden"
          >
            <Image
              src={slide.imageUrl}
              alt={slide.alt}
              fill
              className="object-cover"
              sizes="320px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
