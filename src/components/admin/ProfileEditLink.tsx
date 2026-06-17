"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";

type ProfileEditLinkProps = {
  className?: string;
};

function ProfileEditLinkWithClerk({ className = "" }: ProfileEditLinkProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Link
      href="/admin/profile/edit"
      className={`${outlineAuthButtonClass} ${className}`}
    >
      Edit Profile
    </Link>
  );
}

export function ProfileEditLink(props: ProfileEditLinkProps) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!clerkEnabled) {
    return null;
  }

  return <ProfileEditLinkWithClerk {...props} />;
}
