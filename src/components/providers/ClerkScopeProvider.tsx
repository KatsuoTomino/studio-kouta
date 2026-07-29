"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { isClerkScopedPath } from "@/lib/auth/clerk-scope";

/**
 * 公開ページ（/ /work /profile など）では ClerkProvider を読み込まない。
 * 本番で pk_test（Development instance）を使っている都合上、ClerkProvider
 * が読み込まれると Google のレンダリング時にリダイレクトと誤判定される
 * ことがあるため、Clerk が実際に必要なページだけに限定する。
 * @see src/middleware.ts
 */
export function ClerkScopeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  if (!isClerkScopedPath(pathname)) {
    return <>{children}</>;
  }

  return <ClerkProvider>{children}</ClerkProvider>;
}
