import Image from "next/image";

type ProfileAvatarProps = {
  name: string;
  imageUrl: string;
  sizeClassName?: string;
  sizes?: string;
};

export function ProfileAvatar({
  name,
  imageUrl,
  sizeClassName = "size-24",
  sizes = "96px",
}: ProfileAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || "S";

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-full border border-hairline bg-surface-card ${sizeClassName}`}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
          sizes={sizes}
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-display text-heading-lg text-mute"
          aria-hidden="true"
        >
          {initial}
        </div>
      )}
    </div>
  );
}
