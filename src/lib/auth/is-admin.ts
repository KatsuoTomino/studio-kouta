import { auth } from "@clerk/nextjs/server";
import { getUserEmail } from "@/lib/auth/get-user-email";

export function getAdminEmailFromEnv() {
  return process.env.ADMIN_EMAIL?.trim().toLowerCase();
}

export async function isAdmin() {
  const { sessionClaims, userId } = await auth();
  const adminEmail = getAdminEmailFromEnv();

  if (!userId || !adminEmail) return false;

  const userEmail = await getUserEmail(userId, sessionClaims);
  if (!userEmail) return false;

  return userEmail === adminEmail;
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
  }
}
