import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import QuantitySelector from "@/components/product/QuantitySelector";
import type { ShopProduct } from "@/lib/shop-data";

export default function CartItemRow({
  product,
  qty,
  onQtyChange,
  onRemove,
}: {
  product: ShopProduct;
  qty: number;
  onQtyChange: (qty: number) => void;
  onRemove: () => void;
}) {
  const lineTotal = product.price * qty;

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 py-5">
      <Link
        href={`/product/${product.slug}`}
        className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 rounded-md overflow-hidden border border-black/10 bg-linen"
      >
        {product.image ? (
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        ) : (
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${product.swatch[0]}, ${product.swatch[1]})`,
            }}
          />
        )}
      </Link>

      <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <span className="text-[10.5px] font-semibold tracking-[0.1em] uppercase text-aurum">
            {product.region}
          </span>
          <Link
            href={`/product/${product.slug}`}
            className="block font-medium text-[15.5px] leading-snug mt-1 hover:text-nar transition-colors"
          >
            {product.name}
          </Link>
          <p className="text-[12.5px] text-stone mt-1">
            {product.currency}
            {product.price} each
          </p>

          <button
            onClick={onRemove}
            className="inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-stone hover:text-nar transition-colors mt-3"
          >
            <Trash2 size={14} strokeWidth={1.8} />
            Remove
          </button>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:gap-2.5 shrink-0">
          <QuantitySelector value={qty} onChange={onQtyChange} max={10} />
          <span className="font-serif text-[18px] sm:text-right w-16 sm:w-auto">
            {product.currency}
            {lineTotal}
          </span>
        </div>
      </div>
    </div>
  );
}
