"use client";

import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef } from "react";
import { Footer } from "@/components/lp/Footer";

export default function AuthDeniedPage() {
  const { signOut, loaded } = useClerk();
  const hasSignedOut = useRef(false);

  useEffect(() => {
    if (!loaded || hasSignedOut.current) return;

    hasSignedOut.current = true;
    void signOut({ redirectUrl: "/login?reason=admin-only" });
  }, [loaded, signOut]);

  return (
    <>
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
