"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

type EditHeroLinkProps = {
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
};

function EditHeroLinkWithClerk({
  onNavigate,
  className = "",
  mobile,
}: EditHeroLinkProps) {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <Link
      href="/admin/hero"
      onClick={onNavigate}
      className={`${outlineAuthButtonClass} ${mobile ? "block py-md text-center" : ""} ${className}`}
    >
      Edit Hero
    </Link>
  );
}

export function EditHeroLink(props: EditHeroLinkProps) {
  const pathname = usePathname();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  // 公開ページには ClerkProvider がマウントされないため、
  // ここで useAuth() を呼べるのは Clerk スコープ内のページだけ。
  if (!clerkEnabled || !isClerkScopedPath(pathname)) {
    return null;
  }

  return <EditHeroLinkWithClerk {...props} />;
}
