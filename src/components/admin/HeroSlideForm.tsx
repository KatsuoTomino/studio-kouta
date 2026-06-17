"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { formLabelClass } from "@/components/admin/form-styles";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import type { HeroSlideRecord } from "@/types/hero-slide";
import type { HeroSlideActionResult } from "@/lib/actions/hero-slides";

type HeroSlideFormProps = {
  mode: "create" | "edit";
  slide?: HeroSlideRecord;
  action: (formData: FormData) => Promise<HeroSlideActionResult>;
  deleteAction?: () => Promise<HeroSlideActionResult>;
};

const primaryButtonClass =
  "rounded-md border border-ink bg-ink px-lg py-md text-button-md text-on-dark transition-opacity hover:opacity-90 disabled:opacity-50";

const dangerButtonClass =
  "rounded-md border border-error px-lg py-md text-button-md text-error transition-colors hover:bg-error hover:text-on-dark disabled:opacity-50";

export function HeroSlideForm({
  mode,
  slide,
  action,
  deleteAction,
}: HeroSlideFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    slide?.imageUrl ?? null,
  );
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await action(formData);
      if (!result.ok) {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!window.confirm("Delete this hero slide?")) return;

    setError(null);
    startDeleteTransition(async () => {
      const result = await deleteAction();
      if (!result.ok) {
        setError(result.error);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
      <div className="flex w-full max-w-[20rem] flex-col gap-md">
        <label htmlFor="file" className={formLabelClass}>
          Image{mode === "edit" ? " (optional)" : ""}
        </label>
        <div className="relative aspect-[4/3] w-full overflow-hidden border border-hairline bg-surface-card">
          {previewUrl ? (
            <NextImage
              src={previewUrl}
              alt="Hero slide preview"
              fill
              className="object-cover"
              sizes="320px"
              unoptimized={previewUrl.startsWith("blob:")}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center px-lg text-center text-body-sm text-mute">
              Upload an image to preview
            </div>
          )}
        </div>
        <input
          id="file"
          name="file"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          required={mode === "create"}
          ref={fileInputRef}
          onChange={handleFileChange}
          className="w-full text-body-sm text-body file:mr-md file:rounded-md file:border file:border-hairline file:bg-surface-card file:px-md file:py-xs file:text-button-md file:text-ink"
        />
      </div>

      {error && (
        <p className="text-body-sm text-error" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-md border-t border-hairline-soft pt-lg">
        <button
          type="submit"
          disabled={isPending || isDeleting}
          className={primaryButtonClass}
        >
          {isPending
            ? "Saving..."
            : mode === "create"
              ? "Create"
              : "Update"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/admin/hero")}
          className={outlineAuthButtonClass}
        >
          Cancel
        </button>

        {mode === "edit" && deleteAction && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={isPending || isDeleting}
            className={dangerButtonClass}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        )}
      </div>
    </form>
  );
}
