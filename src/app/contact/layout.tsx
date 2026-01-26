import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Free Pay Stub Generator",
  description: "Contact Free Pay Stub Generator for questions, support, or feedback. We're here to help with your pay stub generation needs.",
  openGraph: {
    title: "Contact Us | Free Pay Stub Generator",
    description: "Contact Free Pay Stub Generator for questions, support, or feedback.",
    url: "https://freepaystubgen.com/contact",
  },
  alternates: {
    canonical: "https://freepaystubgen.com/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
