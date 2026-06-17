import type { ReactNode } from "react";
import { BackButton } from "@/components/layout/BackLink";

type AdminPageHeaderProps = {
  title: string;
  backHref?: string;
  description?: ReactNode;
  action?: ReactNode;
};

export function AdminPageHeader({
  title,
  backHref = "/",
  description,
  action,
}: AdminPageHeaderProps) {
  return (
    <header className="relative mb-xl">
      <div className="absolute right-0 top-0 z-10">
        <BackButton href={backHref} />
      </div>

      <div className="flex flex-col gap-lg pr-24 sm:flex-row sm:items-end sm:justify-between sm:pr-28">
        <div className="min-w-0">
          <h1 className="font-display text-heading-xl text-ink">{title}</h1>
          {description ? (
            <div className="mt-lg text-body-md text-mute">{description}</div>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </header>
  );
}
