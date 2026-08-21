"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SignOutButton, useAuth } from "@clerk/nextjs";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

const authLinkClassName = outlineAuthButtonClass;

type AuthNavProps = {
  onNavigate?: () => void;
  className?: string;
  mobile?: boolean;
};

function ClerkAuthNav({ onNavigate, className = "", mobile }: AuthNavProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { dict } = useI18n();

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
        {dict.auth.login}
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
        {dict.auth.logout}
      </button>
    </SignOutButton>
  );
}

export function AuthNav({ onNavigate, className = "", mobile }: AuthNavProps) {
  const pathname = usePathname();
  const { dict } = useI18n();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  // 公開ページには ClerkProvider がマウントされないため、
  // ここで useAuth() を呼べるのは Clerk スコープ内のページだけ。
  if (!clerkEnabled || !isClerkScopedPath(pathname)) {
    return (
      <Link
        href="/login"
        onClick={onNavigate}
        className={`${authLinkClassName} ${mobile ? "mt-auto py-md text-center" : ""} ${className}`}
      >
        {dict.auth.login}
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
