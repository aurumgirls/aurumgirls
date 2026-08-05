import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "By Aurum Girls — Handcrafted from Rural Azerbaijan",
  description:
    "Authentically handcrafted jams, teas, textiles and handicraft made by village women across Azerbaijan. Shop the marketplace and meet the makers behind every piece.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-linen text-ink"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
