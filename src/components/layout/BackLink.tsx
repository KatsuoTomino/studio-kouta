import Link from "next/link";
import { getDictionary } from "@/lib/i18n/get-locale";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";

type BackButtonProps = {
  href?: string;
  className?: string;
};

export async function BackButton({ href = "/", className = "" }: BackButtonProps) {
  const dict = await getDictionary();

  return (
    <Link href={href} className={`${outlineAuthButtonClass} ${className}`}>
      {dict.common.back}
    </Link>
  );
}

type BackLinkProps = BackButtonProps;

export async function BackLink({ href = "/", className = "" }: BackLinkProps) {
  return (
    <div className="mb-lg flex w-full justify-end">
      <BackButton href={href} className={className} />
    </div>
  );
}
