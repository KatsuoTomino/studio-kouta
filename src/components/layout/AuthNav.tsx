"use client";

import Link from "next/link";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";

const authLinkClassName = outlineAuthButtonClass;

type AuthNavProps = {
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
};

function ClerkAuthNav({ onNavigate, className = "", mobile }: AuthNavProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={`${authLinkClassName} ${mobile ? "mt-auto block py-md text-center" : ""} ${className}`}
      >
        Login
      </Link>
    );
  }

  return (
    <SignOutButton redirectUrl="/">
      <button
        type="button"
        onClick={onNavigate}
        className={`${authLinkClassName} ${mobile ? "mt-auto w-full py-md" : ""} ${className}`}
      >
        Logout
      </button>
    </SignOutButton>
  );
}

export function AuthNav({ onNavigate, className = "", mobile }: AuthNavProps) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!clerkEnabled) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={`${authLinkClassName} ${mobile ? "mt-auto py-md text-center" : ""} ${className}`}
      >
        Login
      </Link>
    );
  }

  return (
    <ClerkAuthNav
      onNavigate={onNavigate}
      className={className}
      mobile={mobile}
    />
  );
}
