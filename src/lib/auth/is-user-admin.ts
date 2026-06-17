import { getUserEmail } from "@/lib/auth/get-user-email";

export function getAdminEmailFromEnv() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase();
}

export function isAllowedAdminEmail(email: string | null | undefined) {
  const adminEmail = getAdminEmailFromEnv();
  if (!adminEmail || !email) return false;

  return email.trim().toLowerCase() === adminEmail;
}

export async function isUserAdmin(
  userId: string,
  sessionClaims: unknown,
): Promise<boolean> {
  const adminEmail = getAdminEmailFromEnv();
  if (!adminEmail) return false;

  const userEmail = await getUserEmail(userId, sessionClaims);
  return isAllowedAdminEmail(userEmail);
}
