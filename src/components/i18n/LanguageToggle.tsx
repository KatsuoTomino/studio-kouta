"use client";

import { useTransition } from "react";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { setLocale } from "@/lib/i18n/actions";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const { locale, dict } = useI18n();
  const [pending, startTransition] = useTransition();

  function select(next: Locale) {
    if (next === locale || pending) return;
    // startTransition に async を渡すと await 後の更新がトランジション外になり、
    // レイアウト再描画中に未マウントの setState になる。revalidatePath で十分。
    // https://react.dev/reference/react/useTransition
    startTransition(() => {
      void setLocale(next);
    });
  }

  return (
    <div
      className={`inline-flex overflow-hidden rounded-md border border-ink ${className}`}
      role="group"
      aria-label={dict.language.toggle}
    >
      {LOCALES.map((code) => {
        const active = code === locale;
        const label = code === "ja" ? "JA" : "EN";
        return (
          <button
            key={code}
            type="button"
            onClick={() => select(code)}
            disabled={pending}
            aria-pressed={active}
            aria-label={code === "ja" ? dict.language.ja : dict.language.en}
            className={`px-md py-xs text-button-md transition-colors disabled:opacity-60 ${
              active
                ? "bg-ink text-on-dark"
                : "bg-canvas text-ink hover:bg-hairline-soft"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
