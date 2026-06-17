import { getUserEmail } from "@/lib/auth/get-user-email";

export function getAdminEmailFromEnv() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase();
}

export async function isUserAdmin(
  userId: string,
  sessionClaims: unknown,
): Promise<boolean> {
  const adminEmail = getAdminEmailFromEnv();
  if (!adminEmail) return false;

  const userEmail = await getUserEmail(userId, sessionClaims);
  if (!userEmail) return false;

  return userEmail === adminEmail;
}
