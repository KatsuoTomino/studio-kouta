import type { UserJSON } from "@clerk/backend";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { clerkClient } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";
import {
  getAdminEmailFromEnv,
  isAllowedAdminEmail,
} from "@/lib/auth/is-user-admin";

function getPrimaryEmail(user: UserJSON) {
  const emails = user.email_addresses ?? [];
  const primary =
    emails.find((address) => address.id === user.primary_email_address_id) ??
    emails[0];

  return primary?.email_address ?? null;
}

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);

    if (event.type === "user.created") {
      const adminEmail = getAdminEmailFromEnv();
      if (!adminEmail) {
        console.error("ADMIN_EMAIL is not configured; rejecting user.created");
        return new Response("ADMIN_EMAIL not configured", { status: 500 });
      }

      const email = getPrimaryEmail(event.data);
      if (!isAllowedAdminEmail(email)) {
        const client = await clerkClient();
        await client.users.deleteUser(event.data.id);
      }
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Clerk webhook verification failed:", error);
    return new Response("Webhook verification failed", { status: 400 });
  }
}
