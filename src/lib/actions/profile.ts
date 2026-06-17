"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/is-admin";
import {
  deleteArtworkObject,
  uploadProfileObject,
} from "@/lib/r2/storage";
import { getProfileRecord, updateProfile } from "@/lib/turso/profile";

export type ProfileActionResult =
  | { ok: true }
  | { ok: false; error: string };

function parseFormFields(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();

  return { name, bio };
}

function validateFields(fields: ReturnType<typeof parseFormFields>) {
  if (!fields.name || !fields.bio) {
    return "Name and bio are required.";
  }
  return null;
}

export async function updateProfileAction(
  formData: FormData,
): Promise<ProfileActionResult> {
  try {
    await requireAdmin();

    const current = await getProfileRecord();
    const fields = parseFormFields(formData);
    const validationError = validateFields(fields);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    let imageUrl = current.imageUrl;
    let imageKey = current.imageKey;

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const uploaded = await uploadProfileObject(
        buffer,
        file.type || "application/octet-stream",
      );

      if (current.imageKey) {
        await deleteArtworkObject(current.imageKey);
      }

      imageUrl = uploaded.imageUrl;
      imageKey = uploaded.imageKey;
    }

    await updateProfile({
      ...fields,
      imageUrl,
      imageKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save profile.";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/profile");
  revalidatePath("/admin/profile/edit");
  redirect("/profile");
}
