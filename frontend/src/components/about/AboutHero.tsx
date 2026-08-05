import Link from "next/link";

export default function AboutHero() {
  return (
    <section className="rounded-xl overflow-hidden bg-cream border border-black/10 shadow-sm">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
        <div className="px-6 sm:px-10 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-aurum mb-4">
            <span className="h-px w-6 bg-aurum" />
            Our story
          </span>
          <h1 className="text-[36px] sm:text-[48px] lg:text-[54px] leading-[1.05] tracking-tight">
            Every purchase is a woman{"'"}s income, not just a product.
          </h1>
          <p className="text-stone text-base sm:text-lg mt-5 max-w-[48ch]">
            By Aurum Girls connects rural women artisans across Azerbaijan directly with
            buyers who value where things come from — no middlemen, no markdowns on her
            work, just her craft reaching further than it ever has.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors"
            >
              Shop Their Work
            </Link>
            <Link
              href="/makers"
              className="inline-flex items-center rounded-sm border-[1.5px] border-olive text-grove text-[15px] font-semibold px-6 py-3.5 hover:bg-sage transition-colors"
            >
              Meet the Makers
            </Link>
          </div>
        </div>

        <div className="relative h-[260px] sm:h-[340px] lg:h-[420px] lg:my-6 lg:mr-6 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(135deg, #33432A 0%, #5E6E3A 45%, #C9A87C 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[radial-gradient(circle_at_70%_30%,#fff,transparent_60%)]" />
          <div className="absolute bottom-5 left-5 right-5 rounded-md bg-cream/95 backdrop-blur px-4 py-3 shadow-md">
            <p className="font-serif italic text-[15px] text-ink leading-snug">
              &ldquo;We&rsquo;re among the last in the village still doing this by hand.&rdquo;
            </p>
            <p className="text-[12px] text-stone mt-1">Firuzə, embroiderer — Basqal</p>
          </div>
        </div>
      </div>
    </section>
  );
}
