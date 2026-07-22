import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { isUserAdmin } from "@/lib/auth/is-user-admin";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function isAuthEntryPath(pathname: string) {
  return pathname.startsWith("/login") || pathname.startsWith("/sign-up");
}

/**
 * 公開ページ（/ /work /profile など）では Clerk middleware を走らせない。
 * 本番で pk_test（Development instance）を使うと X-Clerk-Auth-Reason:
 * dev-browser-missing が付き、Google Search Console がリダイレクトエラーと
 * 誤判定することがあるため。
 * @see https://github.com/clerk/javascript/issues/2720
 * @see https://clerk.com/docs/guides/development/deployment/production
 */
const middleware = clerkEnabled
  ? clerkMiddleware(async (auth, req: NextRequest) => {
      const { pathname } = req.nextUrl;

      if (pathname.startsWith("/api/webhooks/clerk")) {
        return NextResponse.next();
      }

      if (pathname.startsWith("/sign-up")) {
        return NextResponse.redirect(
          new URL("/login?reason=signup-disabled", req.url),
        );
      }

      if (pathname.startsWith("/auth/denied")) {
        return NextResponse.next();
      }

      const { userId, sessionClaims } = await auth();

      if (userId) {
        const admin = await isUserAdmin(userId, sessionClaims);

        if (!admin) {
          return NextResponse.redirect(new URL("/auth/denied", req.url));
        }

        if (isAuthEntryPath(pathname)) {
          return NextResponse.redirect(new URL("/admin", req.url));
        }

        return NextResponse.next();
      }

      if (pathname.startsWith("/admin")) {
        await auth.protect();
      }

      return NextResponse.next();
    })
  : (_req: NextRequest) => NextResponse.next();

export default middleware;

export const config = {
  // 認証が必要な経路だけ。公開 SEO ページは matcher 外＝Clerk 非経由。
  // https://nextjs.org/docs/app/api-reference/file-conventions/middleware#matcher
  matcher: [
    "/admin(.*)",
    "/login(.*)",
    "/sign-up(.*)",
    "/auth(.*)",
    "/api(.*)",
  ],
};
