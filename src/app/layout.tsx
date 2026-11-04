import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { CurrencyProvider } from "@/components/CurrencyProvider";
import { CartProvider } from "@/components/CartProvider";
import Header from "@/components/Header";
import CartDrawer from "@/components/CartDrawer";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import ImageProtection from "@/components/ImageProtection";

import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "car wrap film",
    "PPF film",
    "paint protection film",
    "color change wrap",
    "self-healing wrap",
    "vinyl wrap",
    "PET color change film",
    "liquid metal wrap",
    "chameleon wrap",
    "holographic wrap",
    "matte wrap",
    "gloss wrap",
    "wholesale wrap film",
    "factory direct wrap",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-ink font-sans text-silver-light antialiased">
        <CurrencyProvider>
          <CartProvider>
            <ImageProtection>
              <Header />
              <CartDrawer />
              <main className="pt-16">{children}</main>
              <Footer />
              <FloatingContact />
            </ImageProtection>
          </CartProvider>
        </CurrencyProvider>
        <Analytics />
      </body>
    </html>
  );
}
