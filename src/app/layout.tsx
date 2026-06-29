import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import { BrandJsonLd } from "@/components/seo/BrandJsonLd";
import { getGoogleSiteVerification } from "@/lib/seo/google-verification";
import { createRootMetadata } from "@/lib/seo/metadata";
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

export const metadata: Metadata = createRootMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const googleSiteVerification = getGoogleSiteVerification();
  const clerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  const app = (
    <>
      <Header />
      {children}
    </>
  );

  return (
    <html lang="ja" className={`${inter.variable} ${fredoka.variable} h-full`}>
      <head>
        <meta
          name="google-site-verification"
          content={googleSiteVerification}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <BrandJsonLd />
        {clerkEnabled ? <ClerkProvider>{app}</ClerkProvider> : app}
      </body>
    </html>
  );
}
