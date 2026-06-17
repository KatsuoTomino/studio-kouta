"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  formFieldClass,
  formLabelClass,
} from "@/components/admin/form-styles";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import type { Artwork } from "@/data/artworks";
import type { ArtworkActionResult } from "@/lib/actions/artworks";

type ArtworkFormProps = {
  mode: "create" | "edit";
  artwork?: Artwork;
  action: (formData: FormData) => Promise<ArtworkActionResult>;
  deleteAction?: () => Promise<ArtworkActionResult>;
};

const primaryButtonClass =
  "rounded-md border border-ink bg-ink px-lg py-md text-button-md text-on-dark transition-opacity hover:opacity-90 disabled:opacity-50";

const dangerButtonClass =
  "rounded-md border border-error px-lg py-md text-button-md text-error transition-colors hover:bg-error hover:text-on-dark disabled:opacity-50";

export function ArtworkForm({
  mode,
  artwork,
  action,
  deleteAction,
}: ArtworkFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    artwork?.imageUrl ?? null,
  );
  const [width, setWidth] = useState(artwork?.width ?? 800);
  const [height, setHeight] = useState(artwork?.height ?? 800);
  const [isPending, startTransition] = useTransition();
  const [isDeleting, startDeleteTransition] = useTransition();

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    const img = document.createElement("img");
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
      URL.revokeObjectURL(objectUrl);
      setPreviewUrl(URL.createObjectURL(file));
    };
    img.src = objectUrl;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    formData.set("width", String(width));
    formData.set("height", String(height));

    startTransition(async () => {
      const result = await action(formData);
      if (!result.ok) {
        setError(result.error);
      }
    });
  }

  function handleDelete() {
    if (!deleteAction) return;
    if (!window.confirm("Delete this artwork?")) return;

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
      <div className="grid gap-xl lg:grid-cols-[minmax(0,320px)_1fr]">
        <div className="flex flex-col gap-md">
          <label htmlFor="file" className={formLabelClass}>
            Image{mode === "edit" ? " (optional)" : ""}
          </label>
          <div className="relative aspect-[4/3] w-full overflow-hidden border border-hairline bg-surface-card">
            {previewUrl ? (
              <NextImage
                src={previewUrl}
                alt="Preview"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 320px"
                unoptimized={previewUrl.startsWith("blob:")}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-lg text-center text-body-sm text-mute">
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

        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-xs">
            <label htmlFor="title" className={formLabelClass}>
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              defaultValue={artwork?.title}
              className={formFieldClass}
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="date" className={formLabelClass}>
              Date
            </label>
            <input
              id="date"
              name="date"
              type="text"
              required
              placeholder="2025.03"
              defaultValue={artwork?.date}
              className={formFieldClass}
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="comment" className={formLabelClass}>
              Comment
            </label>
            <textarea
              id="comment"
              name="comment"
              required
              rows={6}
              defaultValue={artwork?.comment}
              className={`${formFieldClass} resize-y`}
            />
          </div>
        </div>
      </div>

      <input type="hidden" name="width" value={width} />
      <input type="hidden" name="height" value={height} />

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
          onClick={() => router.push("/")}
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
