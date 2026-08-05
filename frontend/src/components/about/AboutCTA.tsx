import Link from "next/link";

export default function AboutCTA() {
  return (
    <div className="rounded-xl bg-ink text-linen px-6 sm:px-14 py-12 sm:py-16 text-center">
      <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-aurum-soft">
        Be part of the story
      </span>
      <h2 className="text-linen text-[28px] sm:text-[38px] mt-3 max-w-[26ch] mx-auto leading-[1.1]">
        Every order helps a woman keep her craft — and her income — in her own hands.
      </h2>
      <p className="text-sage/85 text-[15px] sm:text-[16px] mt-4 max-w-[52ch] mx-auto leading-relaxed">
        Shop directly from the makers, or if you know a woman artisan in Azerbaijan,
        invite her to open her own shop with us.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
        <Link
          href="/shop"
          className="inline-flex items-center rounded-sm bg-nar text-white text-[15px] font-semibold px-7 py-3.5 shadow-sm hover:bg-nar-deep transition-colors"
        >
          Shop the Collection
        </Link>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-sm border-[1.5px] border-sage/40 text-linen text-[15px] font-semibold px-7 py-3.5 hover:bg-linen/10 transition-colors"
        >
          Become a Seller
        </Link>
      </div>
    </div>
  );
}
