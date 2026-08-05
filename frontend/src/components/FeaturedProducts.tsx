import Image from "next/image";
import Link from "next/link";
import { Heart, Star } from "lucide-react";
import { featuredProducts } from "@/lib/data";

export default function FeaturedProducts() {
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
        {featuredProducts.map((p) => (
          <div
            key={p.slug}
            className="rounded-lg overflow-hidden bg-cream border border-black/10 shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="relative">
              <Link href={`/product/${p.slug}`} className="block relative h-36 sm:h-44">
                {p.image ? (
                  <Image src={p.image} alt={p.name} fill className="object-cover" />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${p.swatch[0]}, ${p.swatch[1]})`,
                    }}
                  />
                )}
              </Link>
              <button
                aria-label={`Save ${p.name} to wishlist`}
                className="absolute top-2.5 right-2.5 h-8 w-8 rounded-pill bg-cream/95 border border-black/10 flex items-center justify-center shadow-sm hover:text-nar"
              >
                <Heart size={15} strokeWidth={1.8} />
              </button>
              <div className="absolute left-2.5 bottom-2.5 flex items-center gap-1.5 bg-cream/95 rounded-pill pl-1 pr-2.5 py-1 text-[11px] font-semibold shadow-sm">
                <span className="h-5 w-5 rounded-pill bg-sage" />
                {p.maker}
              </div>
            </div>

            <div className="p-4 flex flex-col gap-2 flex-1">
              <span className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-aurum">
                {p.region}
              </span>
              <Link href={`/product/${p.slug}`} className="font-medium text-[14.5px] leading-snug hover:text-nar">
                {p.name}
              </Link>
              <div className="flex items-center gap-1 text-[12px] text-stone">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < p.rating ? "fill-aurum text-aurum" : "text-sand"}
                  />
                ))}
                <span className="ml-1">({p.reviews})</span>
              </div>
              <div className="mt-auto flex items-center justify-between pt-2">
                <span className="font-serif text-[19px]">
                  {p.currency}
                  {p.price}
                </span>
                <button className="rounded-pill bg-nar text-white text-[12.5px] font-semibold px-3.5 py-2 hover:bg-nar-deep transition-colors">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
