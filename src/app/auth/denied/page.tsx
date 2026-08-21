import Link from "next/link";
import { Footer } from "@/components/lp/Footer";
import { SignOutOnMount } from "./sign-out-on-mount";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export default function AuthDeniedPage() {
  return (
    <>
      {clerkEnabled ? <SignOutOnMount /> : null}
      <main className="mx-auto max-w-content px-lg py-section text-center">
        <h1 className="font-display text-heading-xl text-ink">Access denied</h1>
        <p className="mt-lg text-body-md text-mute">
          Only the administrator can sign in. Signing you out...
        </p>
        <Link href="/" className="mt-xl inline-block text-body-sm-strong text-mute hover:text-ink">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
