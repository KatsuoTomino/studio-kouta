"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { compactAuthButtonClass } from "@/components/layout/auth-button-styles";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

type ArtworkEditLinkProps = {
  artworkId: string;
};

function ArtworkEditLinkWithClerk({ artworkId }: ArtworkEditLinkProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Link
      href={`/admin/artworks/${artworkId}/edit`}
      onClick={(event) => event.stopPropagation()}
      className={`absolute right-md top-md z-10 ${compactAuthButtonClass}`}
    >
      Edit
    </Link>
  );
}

export function ArtworkEditLink({ artworkId }: ArtworkEditLinkProps) {
  const pathname = usePathname();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  // 公開ページには ClerkProvider がマウントされないため、
  // ここで useAuth() を呼べるのは Clerk スコープ内のページだけ。
  if (!clerkEnabled || !isClerkScopedPath(pathname)) {
    return null;
  }

  return <ArtworkEditLinkWithClerk artworkId={artworkId} />;
}
