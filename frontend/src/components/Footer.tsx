"use client";

import Image from "next/image";
import Link from "next/link";

const COLUMNS: { title: string; links: string[] }[] = [
  { title: "Shop", links: ["All products", "Categories", "Collections", "Gift sets", "Gift cards"] },
  { title: "Makers", links: ["Meet the makers", "By region", "Sell with us", "Seller resources"] },
  { title: "About", links: ["Our story", "Impact & mission", "How it works", "Journal", "Press"] },
  { title: "Help", links: ["FAQ", "Shipping", "Returns", "Track order", "Contact"] },
  { title: "Account", links: ["Sign in", "My orders", "Wishlist", "Messages"] },
];

export default function Footer() {
  return (
    <footer className="bg-grove text-sage pb-[70px] lg:pb-0">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-10 border-b border-sage/15">
          <div>
            <h2 className="text-linen text-2xl sm:text-3xl">From village hands to your table.</h2>
            <p className="text-sage/80 text-sm mt-2 max-w-[46ch]">
              Join the letter for new makers, seasonal collections &amp; recipes.
            </p>
          </div>
          <form className="flex w-full max-w-[380px] gap-2" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              aria-label="Email address"
              className="flex-1 rounded-pill bg-linen/95 text-ink placeholder:text-stone px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-aurum"
            />
            <button
              type="submit"
              className="rounded-pill bg-nar text-white text-sm font-semibold px-5 py-2.5 hover:bg-nar-deep transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 py-10">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-aurum text-[12px] font-bold tracking-[0.14em] uppercase mb-3.5">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-sage/90 text-sm hover:text-linen transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between pt-8 border-t border-sage/15 text-[13px] text-sage/85">
          <div className="flex items-center gap-3">
            <Image src="/images/logo-white.png" alt="" width={26} height={26} className="h-6 w-6 opacity-90" />
            <span>Language: AZ · EN &nbsp;|&nbsp; Currency: ₼ $ €</span>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <Link href="/legal/terms" className="hover:text-linen">Terms</Link>
            <Link href="/legal/privacy" className="hover:text-linen">Privacy</Link>
            <Link href="/legal/cookies" className="hover:text-linen">Cookies</Link>
            <Link href="/legal/seller-agreement" className="hover:text-linen">Seller agreement</Link>
            <span>© {new Date().getFullYear()} By Aurum Girls</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
