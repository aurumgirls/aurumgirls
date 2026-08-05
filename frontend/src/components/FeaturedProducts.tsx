import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import { shopProducts } from "@/lib/shop-data";

const FEATURED_NAMES = [
  "Rose Petal Jam (Gakh)",
  "Sumac Spice Pouch",
  'Hand-dyed "Kəlağayı" Scarf',
  "Village Gift Hamper",
];

export default function FeaturedProducts() {
  const featured = FEATURED_NAMES.map((name) =>
    shopProducts.find((p) => p.name === name)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-12 sm:py-16">
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
            New arrivals
          </span>
          <h2 className="text-[26px] sm:text-[32px] mt-1">Featured products</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {featured.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
