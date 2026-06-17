import { ProfileForm } from "@/components/admin/ProfileForm";
import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { updateProfileAction } from "@/lib/actions/profile";
import { getProfile } from "@/lib/turso/profile";

export default async function EditProfilePage() {
  const profile = await getProfile();

  return (
    <>
      <main className="mx-auto w-full max-w-5xl px-lg py-section">
        <BackLink href="/profile" />
        <h1 className="font-display text-heading-xl text-ink">Edit Profile</h1>
        <p className="mt-lg text-body-md text-mute">{profile.name}</p>

        <section className="mt-xl border border-hairline bg-canvas p-xl">
          <ProfileForm profile={profile} action={updateProfileAction} />
        </section>
      </main>
      <Footer />
    </>
  );
}
