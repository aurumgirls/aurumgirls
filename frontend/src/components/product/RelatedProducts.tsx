import Link from "next/link";
import ProductCard from "@/components/shop/ProductCard";
import type { ShopProduct } from "@/lib/shop-data";

export default function RelatedProducts({ products }: { products: ShopProduct[] }) {
  if (products.length === 0) return null;

  return (
    <section>
      <div className="flex items-end justify-between mb-7">
        <div>
          <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
            You may also like
          </span>
          <h2 className="text-[26px] sm:text-[32px] mt-1">Related products</h2>
        </div>
        <Link href="/shop" className="text-sm font-semibold text-nar hover:text-nar-deep hidden sm:inline-block">
          View all →
        </Link>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
