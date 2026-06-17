"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AddArtworkLink } from "@/components/admin/AddArtworkLink";
import { EditHeroLink } from "@/components/admin/EditHeroLink";
import { AuthNav } from "@/components/layout/AuthNav";

const navLinks = [
  { href: "/profile", label: "Profile" },
  { href: "/work", label: "Work" },
] as const;

function NavLink({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-body-sm-strong transition-colors ${
        isActive ? "text-ink" : "text-mute hover:text-ink"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 border-b border-hairline-soft bg-surface-card">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-lg">
        <Link
          href="/"
          className="font-display text-body-strong uppercase tracking-[0.12em] text-ink"
        >
          Studio Kouta
        </Link>

        <nav
          className="hidden flex-wrap items-center justify-end gap-md md:flex lg:gap-lg"
          aria-label="メインナビゲーション"
        >
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <AddArtworkLink />
          <EditHeroLink />
          <AuthNav />
        </nav>

        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-md text-ink md:hidden"
          aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-0.5 w-full bg-ink transition-transform ${
                menuOpen ? "top-[6px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] block h-0.5 w-full bg-ink transition-opacity ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-0.5 w-full bg-ink transition-transform ${
                menuOpen ? "top-[6px] -rotate-45" : "top-[12px]"
              }`}
            />
          </span>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden" id="mobile-nav">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="メニューを閉じる"
            onClick={closeMenu}
          />
          <nav
            className="absolute right-0 top-0 flex h-full w-[min(100%,280px)] flex-col gap-xl bg-surface-card px-xl py-xxl shadow-2xl"
            aria-label="モバイルナビゲーション"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                onClick={closeMenu}
              />
            ))}
            <AddArtworkLink onNavigate={closeMenu} mobile />
            <EditHeroLink onNavigate={closeMenu} mobile />
            <AuthNav onNavigate={closeMenu} mobile />
          </nav>
        </div>
      )}
    </header>
  );
}
