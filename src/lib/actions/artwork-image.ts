"use server";

import { requireAdmin } from "@/lib/auth/is-admin";
import {
  deleteArtworkObject,
  uploadArtworkObject,
} from "@/lib/r2/storage";
import { deleteArtwork, getArtwork } from "@/lib/turso/artworks";

export type UploadArtworkImageResult =
  | { ok: true; imageKey: string; imageUrl: string }
  | { ok: false; error: string };

export type DeleteArtworkImageResult =
  | { ok: true }
  | { ok: false; error: string };

export type DeleteArtworkWithImageResult =
  | { ok: true }
  | { ok: false; error: string };

export async function uploadArtworkImage(
  formData: FormData,
): Promise<UploadArtworkImageResult> {
  try {
    await requireAdmin();

    const file = formData.get("file");
    if (!(file instanceof File)) {
      return { ok: false, error: "No file provided." };
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const { imageKey, imageUrl } = await uploadArtworkObject(
      buffer,
      file.type || "application/octet-stream",
    );

    return { ok: true, imageKey, imageUrl };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return { ok: false, error: message };
  }
}

export async function deleteArtworkImageByKey(
  imageKey: string,
): Promise<DeleteArtworkImageResult> {
  try {
    await requireAdmin();

    if (!imageKey) {
      return { ok: true };
    }

    await deleteArtworkObject(imageKey);
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    return { ok: false, error: message };
  }
}

export async function deleteArtworkWithImage(
  id: string,
): Promise<DeleteArtworkWithImageResult> {
  try {
    await requireAdmin();

    const artwork = await getArtwork(id);
    if (!artwork) {
      return { ok: false, error: "Artwork not found." };
    }

    if (artwork.imageKey) {
      await deleteArtworkObject(artwork.imageKey);
    }

    const deleted = await deleteArtwork(id);
    if (!deleted) {
      return { ok: false, error: "Artwork not found." };
    }

    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Delete failed.";
    return { ok: false, error: message };
  }
}
