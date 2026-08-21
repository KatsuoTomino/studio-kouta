"use client";

import { useI18n } from "@/components/i18n/LocaleProvider";
import { SITE_NAME } from "@/lib/seo/site-url";

const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL;
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

export function Footer() {
  const { dict } = useI18n();

  return (
    <footer className="border-t border-hairline-soft bg-surface-card px-lg py-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-md text-center">
        <p className="font-display text-heading-md text-ink">{SITE_NAME}</p>
        <p className="max-w-content text-body-sm text-mute">{dict.home.tagline}</p>
        {(instagramUrl || contactEmail) && (
          <div className="flex gap-lg">
            {instagramUrl ? (
              <a
                href={instagramUrl}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-body-sm-strong text-mute transition-colors hover:text-accent-coral"
              >
                Instagram
              </a>
            ) : null}
            {contactEmail ? (
              <a
                href={`mailto:${contactEmail}`}
                className="text-body-sm-strong text-mute transition-colors hover:text-accent-mint"
              >
                {dict.common.contact}
              </a>
            ) : null}
          </div>
        )}
        <p className="text-caption-sm text-ash">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
