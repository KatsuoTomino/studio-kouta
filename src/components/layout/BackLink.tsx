"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/LocaleProvider";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";

type BackButtonProps = {
  href?: string;
  className?: string;
};

export function BackButton({ href = "/", className = "" }: BackButtonProps) {
  const { dict } = useI18n();

  return (
    <Link href={href} className={`${outlineAuthButtonClass} ${className}`}>
      {dict.common.back}
    </Link>
  );
}

type BackLinkProps = BackButtonProps;

export function BackLink({ href = "/", className = "" }: BackLinkProps) {
  return (
    <div className="mb-lg flex w-full justify-end">
      <BackButton href={href} className={className} />
    </div>
  );
}
