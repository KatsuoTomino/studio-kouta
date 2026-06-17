import { clerkClient } from "@clerk/nextjs/server";

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

export async function getUserEmail(
  userId: string,
  sessionClaims: unknown,
): Promise<string | null> {
  const fromClaims = getEmailFromSessionClaims(sessionClaims);
  if (fromClaims) return fromClaims;

  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const primary = user.emailAddresses.find(
    (address) => address.id === user.primaryEmailAddressId,
  );

  return normalizeEmail(primary?.emailAddress);
}
