"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

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
  const pathname = usePathname();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  // 公開ページには ClerkProvider がマウントされないため、
  // ここで useAuth() を呼べるのは Clerk スコープ内のページだけ。
  if (!clerkEnabled || !isClerkScopedPath(pathname)) {
    return null;
  }

  return <ProfileEditLinkWithClerk {...props} />;
}
