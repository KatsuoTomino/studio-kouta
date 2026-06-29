import type { Metadata } from "next";
import { ProfileEditLink } from "@/components/admin/ProfileEditLink";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { ProfileAvatar } from "@/components/lp/ProfileAvatar";
import { getProfile } from "@/lib/turso/profile";
import { SITE_NAME } from "@/lib/seo/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const trimmedBio = profile.bio.trim();
  const description = trimmedBio
    ? `${profile.name} — ${trimmedBio.slice(0, 120)}${trimmedBio.length > 120 ? "…" : ""}`
    : `${profile.name}のプロフィール | ${SITE_NAME}`;

  return {
    title: "Profile",
    description,
    alternates: {
      canonical: "/profile",
    },
  };
}

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <>
      <main className="mx-auto max-w-content px-lg py-section">
        <BackLink />
        <div className="flex flex-wrap items-center justify-between gap-md">
          <h1 className="font-display text-heading-xl text-ink">Profile</h1>
          <ProfileEditLink />
        </div>

        <div className="mt-xl flex flex-col items-center gap-md text-center">
          <ProfileAvatar
            name={profile.name}
            imageUrl={profile.imageUrl}
            sizeClassName="size-32"
            sizes="128px"
          />
          <p className="font-display text-heading-lg text-ink">{profile.name}</p>
          {profile.bio ? (
            <p className="text-body-md leading-relaxed text-body" lang="en">
              {profile.bio}
            </p>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}
