import type { Metadata } from "next";
import { ProfileEditLink } from "@/components/admin/ProfileEditLink";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { ProfileAvatar } from "@/components/lp/ProfileAvatar";
import { getProfile } from "@/lib/turso/profile";
import {
  ARTIST_NAME_EN,
  ARTIST_NAME_JA,
  PROFILE_PAGE_FALLBACK_DESCRIPTION,
  PROFILE_PAGE_INTRO,
  PROFILE_PAGE_TITLE,
  SITE_NAME,
} from "@/lib/seo/site-url";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const trimmedBio = profile.bio.trim();
  const description = trimmedBio
    ? `沖縄のアーティスト${ARTIST_NAME_JA}（${ARTIST_NAME_EN}）— ${trimmedBio.slice(0, 100)}${trimmedBio.length > 100 ? "…" : ""}`
    : PROFILE_PAGE_FALLBACK_DESCRIPTION;

  return {
    title: PROFILE_PAGE_TITLE,
    description,
    openGraph: {
      title: PROFILE_PAGE_TITLE,
      description,
    },
    twitter: {
      title: PROFILE_PAGE_TITLE,
      description,
    },
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
          <div>
            <h1 className="font-display text-heading-xl text-ink">
              {ARTIST_NAME_JA}のプロフィール
            </h1>
            <p className="mt-md text-body-md leading-relaxed text-mute">
              {PROFILE_PAGE_INTRO}
            </p>
          </div>
          <ProfileEditLink />
        </div>

        <div className="mt-xl flex flex-col items-center gap-md text-center">
          <ProfileAvatar
            name={profile.name}
            imageUrl={profile.imageUrl}
            sizeClassName="size-32"
            sizes="128px"
          />
          <p className="font-display text-heading-lg text-ink">
            {profile.name || `${ARTIST_NAME_JA} / ${SITE_NAME}`}
          </p>
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
