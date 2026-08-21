"use client";

import { useClerk } from "@clerk/nextjs";
import { useEffect, useRef } from "react";

export function SignOutOnMount() {
  const { signOut, loaded } = useClerk();
  const hasSignedOut = useRef(false);

  useEffect(() => {
    if (!loaded || hasSignedOut.current) return;

    hasSignedOut.current = true;
    void signOut({ redirectUrl: "/login?reason=admin-only" });
  }, [loaded, signOut]);

  return null;
}
