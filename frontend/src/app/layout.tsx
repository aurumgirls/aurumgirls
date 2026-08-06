import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "By Aurum Girls — Handcrafted from Rural Azerbaijan",
  description:
    "Authentically handcrafted jams, teas, textiles and handicraft made by village women across Azerbaijan. Discover the curated collection and meet the makers behind every piece.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-aurum-cream text-aurum-charcoal"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
