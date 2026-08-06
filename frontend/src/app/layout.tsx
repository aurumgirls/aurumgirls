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
  title: "By Aurum Girls — Qadın İcmasının Təbii Qida Məhsulları",
  description:
    "Kəndli qadınlarımızın sevgi ilə hazırladığı təbii dağ balı, ev mürəbbələri, kəklikotu və dağ çayları. Poçt vasitəsilə çatdırılma və onlayn ödəniş.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="az"
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
