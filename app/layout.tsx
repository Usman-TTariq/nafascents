import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manropeRegular = localFont({
  src: "../public/fonts/Manrope-Regular.woff2",
  variable: "--font-manropeRegular",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

const timesNewRoman = localFont({
  src: "../public/fonts/times.woff2",
  variable: "--font-times-new-roman",
  display: "swap",
  preload: true,
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  title: "NAFA Scents | Luxury Perfumes Crafted to Last",
  description:
    "Discover NAFA Scents luxury fragrances — Flow Wanted, Sirr Al Oud, Velvet Rose, Alpha Male and The Gentlemen. Long-lasting perfumes crafted for everyday wear.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${manropeRegular.variable} ${timesNewRoman.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
