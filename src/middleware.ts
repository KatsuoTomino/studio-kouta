import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { isUserAdmin } from "@/lib/auth/is-user-admin";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function isAuthEntryPath(pathname: string) {
  return pathname.startsWith("/login") || pathname.startsWith("/sign-up");
}

const middleware = clerkEnabled
  ? clerkMiddleware(async (auth, req: NextRequest) => {
      const { pathname } = req.nextUrl;

      // SEO: bots must reach these without Clerk auth overhead
      if (pathname === "/sitemap.xml" || pathname === "/robots.txt") {
        return NextResponse.next();
      }

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
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|xml|txt)).*)",
    "/(api|trpc)(.*)",
  ],
};
