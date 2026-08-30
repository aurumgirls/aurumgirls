"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartStore, type CartItem } from "@/store/cart-store";
import { resolveImageUrl } from "@/lib/api";
import { FALLBACK_SWATCH } from "@/lib/constants";

export function CartItemRow({ item }: { item: CartItem }) {
  const t = useTranslations("cart");
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-sand">
      <div
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl shrink-0 relative overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: FALLBACK_SWATCH }}
      >
        {item.image ? (
          <Image src={resolveImageUrl(item.image)} alt={item.name} fill className="object-contain p-2" unoptimized />
        ) : (
          <span className="font-display text-forest text-xs text-center px-2 leading-tight">{item.name}</span>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/product/${item.slug}`}>
              <h3 className="font-display text-lg sm:text-xl text-forest truncate hover:text-terracotta transition-colors">{item.name}</h3>
            </Link>
          </div>
          <button
            onClick={() => removeItem(item.id)}
            className="text-slate hover:text-terracotta hover:bg-terracotta/10 rounded-full transition-[color,background-color,transform] duration-200 ease-organic active:scale-90 p-1.5"
            aria-label={t('item.remove')}
          >
            <Trash2 size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center bg-cream border border-sand rounded-full">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-forest hover:text-terracotta hover:bg-linen transition-[color,background-color,transform] duration-200 ease-organic active:scale-90"
              aria-label={t('item.decrease')}
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium text-sm tabular-nums">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-forest hover:text-terracotta hover:bg-linen transition-[color,background-color,transform] duration-200 ease-organic active:scale-90"
              aria-label={t('item.increase')}
            >
              <Plus size={16} />
            </button>
          </div>
          <div className="font-medium text-lg text-forest tabular-nums">{(item.price * item.quantity).toFixed(2)} ₼</div>
        </div>
      </div>
    </div>
  );
}
