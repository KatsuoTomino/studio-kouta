"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { compactAuthButtonClass } from "@/components/layout/auth-button-styles";

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
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!clerkEnabled) {
    return null;
  }

  return <ArtworkEditLinkWithClerk artworkId={artworkId} />;
}
