import type { Metadata } from "next";
import { NOINDEX_METADATA } from "@/lib/seo/metadata";

// Clerk hooks を使うため静的プリレンダーしない（ビルド時の ClerkProvider 欠如を避ける）
export const dynamic = "force-dynamic";

export const metadata: Metadata = NOINDEX_METADATA;

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
