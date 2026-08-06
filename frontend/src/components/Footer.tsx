"use client";

import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "./SocialIcons";

const LINKS = [
  { label: "Marketplace", href: "/marketplace" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-aurum-sand">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Col 1 — Logo & tagline */}
          <div className="lg:col-span-4">
            <Image
              src="/images/logo-color.png"
              alt="By Aurum Girls"
              width={128}
              height={128}
              className="w-32 h-auto"
            />
            <p className="font-sans text-sm text-aurum-stone mt-4 max-w-[32ch] leading-relaxed">
              From village hands to your table — handmade goods from the women of rural
              Azerbaijan.
            </p>
          </div>

          {/* Col 2 — Newsletter */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-lg text-aurum-charcoal mb-3">Stay close to the story</h4>
            <form
              className="flex flex-col sm:flex-row gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                aria-label="Email address"
                className="flex-1 bg-aurum-cream border-none rounded-pill px-4 py-2 text-sm text-aurum-charcoal placeholder-aurum-stone outline-none focus:ring-2 focus:ring-aurum-clay transition-shadow"
              />
              <button
                type="submit"
                className="rounded-pill bg-aurum-charcoal text-aurum-cream text-sm font-medium px-6 py-2 hover:bg-aurum-earth transition-colors duration-300 shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Col 3 — Links */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-sm font-medium text-aurum-charcoal mb-3.5">Explore</h4>
            <ul className="space-y-2.5">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-aurum-stone hover:text-aurum-clay transition-colors duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Social */}
          <div className="lg:col-span-2">
            <h4 className="font-sans text-sm font-medium text-aurum-charcoal mb-3.5">Follow</h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="text-aurum-charcoal hover:text-aurum-clay transition-colors duration-300"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="text-aurum-charcoal hover:text-aurum-clay transition-colors duration-300"
              >
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-aurum-charcoal/10 text-xs text-aurum-stone">
          © {new Date().getFullYear()} By Aurum Girls. Proudly handmade in Azerbaijan.
        </div>
      </div>
    </footer>
  );
}
