"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

type AddArtworkLinkProps = {
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
};

function AddArtworkLinkWithClerk({
  onNavigate,
  className = "",
  mobile,
}: AddArtworkLinkProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Link
      href="/admin/artworks/new"
      onClick={onNavigate}
      className={`${outlineAuthButtonClass} ${mobile ? "block py-md text-center" : ""} ${className}`}
    >
      Add Artwork
    </Link>
  );
}

export function AddArtworkLink(props: AddArtworkLinkProps) {
  const pathname = usePathname();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  // 公開ページには ClerkProvider がマウントされないため、
  // ここで useAuth() を呼べるのは Clerk スコープ内のページだけ。
  if (!clerkEnabled || !isClerkScopedPath(pathname)) {
    return null;
  }

  return <AddArtworkLinkWithClerk {...props} />;
}
