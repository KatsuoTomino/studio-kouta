import { INSTAGRAM_URL } from "@/lib/seo/site-url";

type InstagramLinkProps = {
  label: string;
  className?: string;
};

export function InstagramLink({ label, className = "" }: InstagramLinkProps) {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="me noopener noreferrer"
      className={`inline-flex flex-col items-center gap-xxs text-ink transition-colors hover:text-mute ${className}`}
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
      <span className="text-caption-sm leading-none text-ash">{label}</span>
    </a>
  );
}
