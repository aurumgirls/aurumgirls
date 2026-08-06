import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Painterland Sisters Yogurt | Organic Skyr Yogurt",
  description:
    "Our organic skyr yogurt is made with organic milk from our family farm in Pennsylvania, along with milk from trusted neighboring farms that share our commitment to quality and sustainability.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col bg-cream text-charcoal"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
