import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PortfolioProvider } from "@/contexts/PortfolioContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Folio.AI — Build Your Dream Portfolio",
    template: "%s | Folio.AI",
  },
  description:
    "Create stunning, professional portfolio websites in minutes. AI-powered content generation, 7 premium templates, and one-click publishing.",
  keywords: [
    "portfolio builder",
    "AI portfolio",
    "professional portfolio",
    "developer portfolio",
    "designer portfolio",
  ],
  authors: [{ name: "Folio.AI" }],
  creator: "Folio.AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Folio.AI — Build Your Dream Portfolio",
    description:
      "Create stunning, professional portfolio websites in minutes with AI.",
    siteName: "Folio.AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "Folio.AI — Build Your Dream Portfolio",
    description: "Create stunning portfolio websites in minutes with AI.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-[#040817] text-white antialiased">
        <PortfolioProvider>{children}</PortfolioProvider>
      </body>
    </html>
  );
}
