"use client";

import NextImage from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import {
  formFieldClass,
  formLabelClass,
} from "@/components/admin/form-styles";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";
import type { Profile } from "@/data/artworks";
import type { ProfileActionResult } from "@/lib/actions/profile";

type ProfileFormProps = {
  profile: Profile;
  action: (formData: FormData) => Promise<ProfileActionResult>;
};

const primaryButtonClass =
  "rounded-md border border-ink bg-ink px-lg py-md text-button-md text-on-dark transition-opacity hover:opacity-90 disabled:opacity-50";

export function ProfileForm({ profile, action }: ProfileFormProps) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile.imageUrl);
  const [isPending, startTransition] = useTransition();

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

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-xl">
      <div className="grid gap-xl lg:grid-cols-[minmax(0,240px)_1fr]">
        <div className="flex flex-col items-center gap-md">
          <label htmlFor="file" className={`${formLabelClass} self-start`}>
            Photo (optional)
          </label>
          <div className="relative size-40 overflow-hidden rounded-full border border-hairline bg-surface-card">
            {previewUrl ? (
              <NextImage
                src={previewUrl}
                alt="Profile preview"
                fill
                className="object-cover"
                sizes="160px"
                unoptimized={previewUrl.startsWith("blob:")}
              />
            ) : (
              <div className="flex h-full items-center justify-center px-md text-center text-body-sm text-mute">
                No photo
              </div>
            )}
          </div>
          <input
            id="file"
            name="file"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="w-full text-body-sm text-body file:mr-md file:rounded-md file:border file:border-hairline file:bg-surface-card file:px-md file:py-xs file:text-button-md file:text-ink"
          />
        </div>

        <div className="flex flex-col gap-lg">
          <div className="flex flex-col gap-xs">
            <label htmlFor="name" className={formLabelClass}>
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              defaultValue={profile.name}
              className={formFieldClass}
            />
          </div>

          <div className="flex flex-col gap-xs">
            <label htmlFor="bio" className={formLabelClass}>
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              required
              rows={8}
              defaultValue={profile.bio}
              className={`${formFieldClass} resize-y`}
              lang="en"
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="text-body-sm text-error" role="alert">
          {error}
        </p>
      )}

      <div className="flex flex-wrap gap-md border-t border-hairline-soft pt-lg">
        <button
          type="submit"
          disabled={isPending}
          className={primaryButtonClass}
        >
          {isPending ? "Saving..." : "Update"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/profile")}
          className={outlineAuthButtonClass}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
