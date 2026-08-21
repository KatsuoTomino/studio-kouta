"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isLocale, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

// https://nextjs.org/docs/app/api-reference/functions/cookies
export async function setLocale(locale: Locale) {
  if (!isLocale(locale)) return;

  const cookieStore = await cookies();
  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  revalidatePath("/", "layout");
}
