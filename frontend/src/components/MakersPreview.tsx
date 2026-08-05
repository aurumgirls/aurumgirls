import Link from "next/link";
import { makerProfiles, getMakerProducts } from "@/lib/makers-data";

const FEATURED_SLUGS = ["basti-huseynova", "zeyneb-eliyeva", "nergiz-quliyeva", "aygun-memmedova"];

export default function MakersPreview() {
  const featured = FEATURED_SLUGS.map((slug) =>
    makerProfiles.find((m) => m.slug === slug)
  ).filter((m): m is NonNullable<typeof m> => Boolean(m));

  return (
    <section className="bg-cream border-y border-black/10">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-7 py-12 sm:py-16">
        <div className="flex items-end justify-between mb-7">
          <div>
            <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
              About the sellers
            </span>
            <h2 className="text-[26px] sm:text-[32px] mt-1">Meet our artisans</h2>
          </div>
          <Link href="/makers" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
            View all makers →
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {featured.map((m) => (
            <Link
              key={m.slug}
              href={`/makers/${m.slug}`}
              className="rounded-lg overflow-hidden bg-linen border border-black/10 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className="h-24 sm:h-28"
                style={{ background: `linear-gradient(135deg, ${m.swatch[0]}, ${m.swatch[1]})` }}
              />
              <div className="p-4">
                <h3 className="text-[15px] font-medium leading-snug">{m.personName}</h3>
                <p className="text-[12px] text-stone mt-0.5">{m.craft}</p>
                <p className="text-[11.5px] text-aurum font-semibold mt-2 tracking-wide uppercase">
                  {m.village} · {getMakerProducts(m.shopName).length} products
                </p>
              </div>
            </Link>
          ))}
        </div>

        <p className="text-stone text-[15px] max-w-[64ch] mt-8 leading-relaxed">
          Welcome to the women behind every jar, thread and stitch. Each maker on By Aurum
          Girls sets her own prices, tells her own story, and is paid directly for her work —
          connecting rural craft traditions in Azerbaijan with buyers who value where things
          come from.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center rounded-sm bg-nar text-white text-[14px] font-semibold px-5 py-2.5 mt-5 hover:bg-nar-deep transition-colors"
        >
          Read more
        </Link>
      </div>
    </section>
  );
}
