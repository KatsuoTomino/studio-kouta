const CLERK_SCOPED_PREFIXES = ["/admin", "/login", "/sign-up", "/auth"] as const;

/**
 * ClerkProvider / useAuth などを使ってよいページかどうか。
 * 公開ページ（/ /work /profile など）では Clerk の Development instance
 * スクリプトを読み込ませないため、ここに含まれないパスでは Clerk 関連
 * コンポーネントを一切マウントしない。
 * middleware.ts の matcher と対応させること。
 */
export function isClerkScopedPath(pathname: string): boolean {
  return CLERK_SCOPED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
