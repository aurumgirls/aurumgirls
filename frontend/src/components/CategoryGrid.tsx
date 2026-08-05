import Link from "next/link";
import { categories } from "@/lib/data";

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-12 sm:py-16">
      <div className="flex items-end justify-between mb-7">
        <h2 className="text-[26px] sm:text-[32px]">Shop by category</h2>
        <Link href="/shop" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/shop/${cat.slug}`}
            className="group rounded-lg overflow-hidden bg-cream border border-black/10 shadow-sm hover:shadow-md transition-shadow"
          >
            <div
              className="h-28 sm:h-36"
              style={{
                background: `linear-gradient(135deg, ${cat.swatch[0]}, ${cat.swatch[1]})`,
              }}
            />
            <div className="p-4">
              <h3 className="text-[16px] sm:text-[18px] leading-snug">{cat.name}</h3>
              <p className="text-[12.5px] text-stone mt-1">{cat.blurb}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
