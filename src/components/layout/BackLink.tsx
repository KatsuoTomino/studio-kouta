import Link from "next/link";
import { outlineAuthButtonClass } from "@/components/layout/auth-button-styles";

type BackButtonProps = {
  href?: string;
  className?: string;
};

export function BackButton({ href = "/", className = "" }: BackButtonProps) {
  return (
    <Link href={href} className={`${outlineAuthButtonClass} ${className}`}>
      Back
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
