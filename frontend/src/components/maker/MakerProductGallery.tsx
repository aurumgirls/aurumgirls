import ProductCard from "@/components/shop/ProductCard";
import type { ShopProduct } from "@/lib/shop-data";

export default function MakerProductGallery({
  products,
  makerName,
}: {
  products: ShopProduct[];
  makerName: string;
}) {
  return (
    <div>
      <div className="mb-7">
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Product gallery
        </span>
        <h2 className="text-[28px] sm:text-[34px] mt-1.5">
          Everything from {makerName}
        </h2>
        <p className="text-stone text-[15px] mt-2">
          {products.length} {products.length === 1 ? "product" : "products"}, made and shipped
          directly by her.
        </p>
      </div>

      {products.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <p className="text-stone text-[14px]">
          This maker doesn&rsquo;t have any active listings right now — check back soon.
        </p>
      )}
    </div>
  );
}
