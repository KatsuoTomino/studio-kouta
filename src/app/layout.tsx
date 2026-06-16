import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Studio Kouta",
  description: "絵が、部屋にいる。Studio Kouta のオンライン展示",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <html lang="ja" className={`${inter.variable} ${fredoka.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <Header />
        {clerkEnabled ? <ClerkProvider>{children}</ClerkProvider> : children}
      </body>
    </html>
  );
}
