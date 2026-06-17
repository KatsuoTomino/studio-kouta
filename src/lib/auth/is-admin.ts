import { auth } from "@clerk/nextjs/server";
import { isUserAdmin } from "@/lib/auth/is-user-admin";

export { getAdminEmailFromEnv } from "@/lib/auth/is-user-admin";

export async function isAdmin() {
  const { sessionClaims, userId } = await auth();
  if (!userId) return false;

  return isUserAdmin(userId, sessionClaims);
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    throw new Error("Not authorized");
  }
}
