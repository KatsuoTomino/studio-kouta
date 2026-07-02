import Image from "next/image";
import type { Profile } from "@/types/profile";
import type { HeroSlide } from "@/types/hero-slide";
import { HeroScrollPanels } from "./HeroScrollPanels";
import { ProfileAvatar } from "./ProfileAvatar";

type HeroProps = {
  slides: HeroSlide[];
  profile: Profile;
};

export function Hero({ slides, profile }: HeroProps) {
  return (
    <section className="flex flex-col items-center pb-section pt-xl">
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-lg text-center">
        <Image
          src="/mascot.png"
          alt="Studio Kouta"
          width={600}
          height={800}
          priority
          className="mb-lg h-40 w-auto"
        />

        <h1 className="font-display text-display-lg font-bold uppercase tracking-[0.12em] text-ink md:text-display-xl">
          Studio Kouta
        </h1>

        <div className="mt-lg flex w-full max-w-content flex-col items-center gap-md">
          <ProfileAvatar name={profile.name} imageUrl={profile.imageUrl} />
          {profile.bio ? (
            <p className="w-full text-sm leading-relaxed text-mute" lang="en">
              {profile.bio}
            </p>
          ) : null}
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
