"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth/is-admin";
import {
  deleteArtworkObject,
  uploadHeroObject,
} from "@/lib/r2/storage";
import {
  createHeroSlide,
  deleteHeroSlide,
  getHeroSlide,
  updateHeroSlide,
} from "@/lib/turso/hero-slides";

export type HeroSlideActionResult =
  | { ok: true }
  | { ok: false; error: string };

const DEFAULT_ALT = "Hero slide";

export async function createHeroSlideAction(
  formData: FormData,
): Promise<HeroSlideActionResult> {
  try {
    await requireAdmin();

    const file = formData.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return { ok: false, error: "Please select an image." };
    }

    const buffer = new Uint8Array(await file.arrayBuffer());
    const { imageKey, imageUrl } = await uploadHeroObject(
      buffer,
      file.type || "application/octet-stream",
    );

    await createHeroSlide({
      alt: DEFAULT_ALT,
      imageUrl,
      imageKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to save hero slide.";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function updateHeroSlideAction(
  id: string,
  formData: FormData,
): Promise<HeroSlideActionResult> {
  try {
    await requireAdmin();

    const current = await getHeroSlide(id);
    if (!current) {
      return { ok: false, error: "Hero slide not found." };
    }

    let imageUrl = current.imageUrl;
    let imageKey = current.imageKey;

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const uploaded = await uploadHeroObject(
        buffer,
        file.type || "application/octet-stream",
      );

      if (current.imageKey) {
        await deleteArtworkObject(current.imageKey);
      }

      imageUrl = uploaded.imageUrl;
      imageKey = uploaded.imageKey;
    }

    await updateHeroSlide(id, {
      imageUrl,
      imageKey,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to update hero slide.";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}

export async function deleteHeroSlideAction(
  id: string,
): Promise<HeroSlideActionResult> {
  try {
    await requireAdmin();

    const slide = await getHeroSlide(id);
    if (!slide) {
      return { ok: false, error: "Hero slide not found." };
    }

    if (slide.imageKey) {
      await deleteArtworkObject(slide.imageKey);
    }

    const deleted = await deleteHeroSlide(id);
    if (!deleted) {
      return { ok: false, error: "Hero slide not found." };
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to delete hero slide.";
    return { ok: false, error: message };
  }

  revalidatePath("/");
  revalidatePath("/admin/hero");
  redirect("/admin/hero");
}
