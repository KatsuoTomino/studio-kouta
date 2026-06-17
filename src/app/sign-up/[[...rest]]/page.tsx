import { BackLink } from "@/components/layout/BackLink";
import { Footer } from "@/components/lp/Footer";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!clerkEnabled) {
    return null;
  }

  return (
    <>
      <main className="mx-auto max-w-content px-lg py-section">
        <BackLink href="/login" />
        <p className="mb-lg text-body-sm text-mute">
          Administrator registration only. Use the Google account configured in
          ADMIN_EMAIL.
        </p>
        <SignUp
          signInUrl="/login"
          fallbackRedirectUrl="/admin"
          forceRedirectUrl="/admin"
        />
      </main>
      <Footer />
    </>
  );
}
