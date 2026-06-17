import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { getUserEmail } from "@/lib/auth/get-user-email";

const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const middleware = clerkEnabled
  ? clerkMiddleware(async (auth, req: NextRequest) => {
      const { pathname } = req.nextUrl;
      if (pathname.startsWith("/admin")) {
        const signedInAuth = await auth.protect();
        const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const userEmail = await getUserEmail(
          signedInAuth.userId,
          signedInAuth.sessionClaims,
        );

        if (!adminEmail || !userEmail || userEmail !== adminEmail) {
          return new NextResponse("Not authorized", { status: 403 });
        }

        return NextResponse.next();
      }

      return NextResponse.next();
    })
  : (_req: NextRequest) => NextResponse.next();

export default middleware;

export const config = {
  matcher: ["/admin(.*)"],
};
