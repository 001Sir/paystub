import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WebsiteJsonLd, SoftwareApplicationJsonLd, OrganizationJsonLd, FAQJsonLd } from "@/components/JsonLd";
import CookieConsent from "@/components/CookieConsent";
import SkipToMain from "@/components/SkipToMain";
import Analytics from "@/components/Analytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free Pay Stub Generator | Create Professional Pay Stubs Online",
  description: "Free pay stub generator for all 50 US states. Create professional pay stubs with accurate federal and state tax calculations. No signup required.",
  keywords: ["pay stub generator", "free pay stub", "paystub maker", "pay stub template", "paycheck stub generator", "free paystub generator", "online paystub creator", "pay stub calculator"],
  authors: [{ name: "Free Pay Stub Generator" }],
  creator: "Free Pay Stub Generator",
  publisher: "Free Pay Stub Generator",
  metadataBase: new URL("https://freepaystubgen.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://freepaystubgen.com",
    siteName: "Free Pay Stub Generator",
    title: "Free Pay Stub Generator | Create Professional Pay Stubs Online",
    description: "Free pay stub generator for all 50 US states. Create professional pay stubs with accurate federal and state tax calculations. No signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Free Pay Stub Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Pay Stub Generator",
    description: "Create professional pay stubs for free. Accurate tax calculations for all 50 US states.",
    images: ["/og-image.png"],
  },
  verification: {
    // Add your Google Search Console verification code here
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://freepaystubgen.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <WebsiteJsonLd />
        <SoftwareApplicationJsonLd />
        <OrganizationJsonLd />
        <FAQJsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipToMain />
        <Analytics />
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
