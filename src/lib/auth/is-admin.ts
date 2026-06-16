import { auth } from "@clerk/nextjs/server";

function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase();
}

export function getAdminEmailFromEnv() {
  return normalizeEmail(process.env.ADMIN_EMAIL);
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

export function isAdmin() {
  const { sessionClaims, userId } = auth();
  const adminEmail = getAdminEmailFromEnv();
  const userEmail = getEmailFromSessionClaims(sessionClaims);

  if (!userId || !adminEmail || !userEmail) return false;
  return userEmail === adminEmail;
}

export function requireAdmin() {
  if (!isAdmin()) {
    // Phase 4 以降、admin route 上の Server Action / API で拾える想定です。
    throw new Error("Not authorized");
  }
}

