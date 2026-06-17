"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/is-admin";
import {
  deleteArtworkObject,
  uploadArtworkObject,
} from "@/lib/r2/storage";
import {
  createArtwork,
  getArtwork,
  updateArtwork,
} from "@/lib/turso/artworks";
import { deleteArtworkWithImage } from "@/lib/actions/artwork-image";

export type ArtworkActionResult =
  | { ok: true }
  | { ok: false; error: string };

function parseFormFields(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const date = String(formData.get("date") ?? "").trim();
  const comment = String(formData.get("comment") ?? "").trim();
  const width = Number(formData.get("width")) || 800;
  const height = Number(formData.get("height")) || 800;

  return { title, date, comment, width, height };
}

function validateFields(fields: ReturnType<typeof parseFormFields>) {
  if (!fields.title || !fields.date || !fields.comment) {
    return "タイトル・日付・コメントを入力してください。";
  }
  return null;
}

export async function createArtworkAction(
  formData: FormData,
): Promise<ArtworkActionResult> {
  try {
    await requireAdmin();

    const fields = parseFormFields(formData);
    const validationError = validateFields(fields);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "画像を選択してください。" };
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const { imageKey, imageUrl } = await uploadArtworkObject(
      buffer,
      file.type || "application/octet-stream",
    );

    await createArtwork({
      ...fields,
      imageUrl,
      imageKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "保存に失敗しました。";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateArtworkAction(
  id: string,
  formData: FormData,
): Promise<ArtworkActionResult> {
  try {
    await requireAdmin();

    const current = await getArtwork(id);
    if (!current) {
      return { ok: false, error: "作品が見つかりません。" };
    }

    const fields = parseFormFields(formData);
    const validationError = validateFields(fields);
    if (validationError) {
      return { ok: false, error: validationError };
    }

    let imageUrl = current.imageUrl;
    let imageKey = current.imageKey ?? "";

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const uploaded = await uploadArtworkObject(
        buffer,
        file.type || "application/octet-stream",
      );

      if (current.imageKey) {
        await deleteArtworkObject(current.imageKey);
      }

      imageUrl = uploaded.imageUrl;
      imageKey = uploaded.imageKey;
    }

    await updateArtwork(id, {
      ...fields,
      imageUrl,
      imageKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "更新に失敗しました。";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function deleteArtworkAction(
  id: string,
): Promise<ArtworkActionResult> {
  const result = await deleteArtworkWithImage(id);
  if (!result.ok) {
    return result;
  }

  revalidatePath("/");
  revalidatePath("/work");
  revalidatePath("/admin");
  redirect("/admin");
}
