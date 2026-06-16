import Image from "next/image";
import { Footer } from "@/components/lp/Footer";
import { profile } from "@/data/artworks";

export default function ProfilePage() {
  return (
    <>
      <main className="mx-auto max-w-content px-lg py-section">
        <h1 className="font-display text-heading-xl text-ink">Profile</h1>

        <div className="mt-xl flex flex-col items-center gap-md text-center">
          <div className="relative size-32 shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-card">
            <Image
              src={profile.imageUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>
          <p className="font-display text-heading-lg text-ink">{profile.name}</p>
          <p className="text-body-md leading-relaxed text-body" lang="en">
            {profile.bio}
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
