import Link from "next/link";
import { giftCollections } from "@/lib/data";

export default function GiftCollections() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-12 sm:py-16">
      <div className="flex items-end justify-between mb-7">
        <h2 className="text-[26px] sm:text-[32px]">Curated gift collections</h2>
        <Link href="/gifts" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          Explore gifting →
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {giftCollections.map((g) => (
          <Link
            key={g.name}
            href="/gifts"
            className="group relative rounded-lg overflow-hidden h-52 sm:h-60 border border-black/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(150deg, ${g.swatch[0]}, ${g.swatch[1]})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-linen">
              <h3 className="text-[19px]">{g.name}</h3>
              <p className="text-[12.5px] text-linen/85 mt-1">{g.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
