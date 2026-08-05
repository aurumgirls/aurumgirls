import Link from "next/link";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-7 pt-10 sm:pt-14 pb-6">
      <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 items-center rounded-xl overflow-hidden bg-cream border border-black/10 shadow-sm">
        <div className="px-6 sm:px-10 py-10 sm:py-14">
          <span className="inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.22em] uppercase text-aurum mb-4">
            <span className="h-px w-6 bg-aurum" />
            Made by her hands
          </span>
          <h1 className="text-[38px] sm:text-[52px] lg:text-[58px] leading-[1.04] tracking-tight">
            Empowering rural women.{" "}
            <em className="italic text-nar not-italic sm:italic">
              Authentically handcrafted
            </em>{" "}
            from Azerbaijan.
          </h1>
          <p className="text-stone text-base sm:text-lg mt-5 max-w-[46ch]">
            Jams, teas, textiles and handicraft made in villages across Azerbaijan —
            every purchase pays a maker directly.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              href="/shop"
              className="inline-flex items-center rounded-sm bg-nar text-white text-[15px] font-semibold px-6 py-3.5 shadow-sm hover:bg-nar-deep transition-colors"
            >
              Shop Collection
            </Link>
            <Link
              href="/makers"
              className="inline-flex items-center rounded-sm border-[1.5px] border-olive text-grove text-[15px] font-semibold px-6 py-3.5 hover:bg-sage transition-colors"
            >
              Meet the Makers
            </Link>
          </div>
        </div>

        <div className="relative h-[280px] sm:h-[360px] lg:h-[440px] lg:my-6 lg:mr-6 rounded-lg overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #A83A2B 0%, #C0892E 45%, #C9A87C 100%)",
            }}
          />
          <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_60%)]" />
          <div className="absolute bottom-5 left-5 right-5 rounded-md bg-cream/95 backdrop-blur px-4 py-3 shadow-md">
            <p className="font-serif italic text-[15px] text-ink leading-snug">
              &ldquo;Every scarf carries a village&rsquo;s story.&rdquo;
            </p>
            <p className="text-[12px] text-stone mt-1">Basti, weaver — Sheki</p>
          </div>
        </div>
      </div>
    </section>
  );
}
