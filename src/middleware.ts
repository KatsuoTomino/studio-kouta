import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? null;
}

function getEmailFromSessionClaims(sessionClaims: unknown) {
  if (!sessionClaims || typeof sessionClaims !== "object") return null;
  const claims = sessionClaims as Record<string, unknown>;

  const email =
    (typeof claims.email === "string" && claims.email) ||
    (typeof claims.primary_email_address === "string" &&
      claims.primary_email_address) ||
    (typeof claims.primaryEmailAddress === "string" &&
      claims.primaryEmailAddress) ||
    null;

  return normalizeEmail(email);
}

const middleware = clerkEnabled
  ? clerkMiddleware((auth, req: NextRequest) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith("/admin")) {
        return auth.protect().then((signedInAuth) => {
          const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
          const userEmail = getEmailFromSessionClaims(
            signedInAuth.sessionClaims,
          );

          if (!adminEmail || !userEmail || userEmail !== adminEmail) {
            return new NextResponse("Not authorized", { status: 404 });
          }

          return NextResponse.next();
        });
      }

      return NextResponse.next();
    })
  : (_req: NextRequest) => NextResponse.next();

export default middleware;

export const config = {
  matcher: ["/admin(.*)"],
};

