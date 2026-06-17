import Image from "next/image";
import type { Profile } from "@/data/artworks";
import type { HeroSlide } from "@/types/hero-slide";
import { HeroScrollPanels } from "./HeroScrollPanels";

type HeroProps = {
  slides: HeroSlide[];
  profile: Profile;
};

export function Hero({ slides, profile }: HeroProps) {
  return (
    <section className="flex flex-col items-center pb-section pt-xl">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-lg text-center">
        <svg
          viewBox="0 0 48 48"
          className="mb-lg h-12 w-12 text-ink"
          aria-hidden="true"
        >
          <rect
            x="8"
            y="14"
            width="32"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="8"
            y1="22"
            x2="40"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <line
            x1="8"
            y1="30"
            x2="40"
            y2="30"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M24 6 L34 14 L14 14 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>

        <h1 className="font-display text-display-lg font-bold uppercase tracking-[0.12em] text-ink md:text-display-xl">
          Studio Kouta
        </h1>

        <div className="mt-lg flex w-full max-w-content flex-col items-center gap-md">
          <div className="relative size-24 shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-card">
            <Image
              src={profile.imageUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="96px"
            />
          </div>
          <p className="w-full text-sm leading-relaxed text-mute" lang="en">
            {profile.bio}
          </p>
        </div>
      </div>

      <div className="relative mt-xl h-[min(70vh,640px)] w-full overflow-hidden">
        <HeroScrollPanels slides={slides} />

        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/10"
          aria-hidden="true"
        >
          <p className="font-display text-display-lg text-on-dark drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] md:text-display-xl">
            Studio Kouta
          </p>
        </div>
      </div>
    </section>
  );
}
