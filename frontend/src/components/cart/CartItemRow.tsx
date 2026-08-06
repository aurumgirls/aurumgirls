"use client";

import Image from 'next/image';
import Link from 'next/link';
import { CartItem, useCartStore } from '@/store/cart-store';
import { QuantitySelector } from '@/components/product/QuantitySelector';
import { Trash2 } from 'lucide-react';

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { updateQuantity, removeItem } = useCartStore();

  return (
    <div className="flex gap-6 py-6 border-b border-sand last:border-0 last:pb-0 first:pt-0">
      <Link href={`/product/${item.slug}`} className="flex-shrink-0">
        <div 
          className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl flex items-center justify-center overflow-hidden transition-transform hover:scale-105"
          style={{ backgroundColor: item.flavorColor || '#F5EBE6' }}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.name}
              width={120}
              height={120}
              unoptimized
              className="object-contain p-2"
            />
          ) : (
            <span className="font-display text-forest text-sm">Painterland</span>
          )}
        </div>
      </Link>

      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div>
            <p className="text-xs text-slate uppercase tracking-wider font-semibold mb-1">{item.category}</p>
            <Link href={`/product/${item.slug}`}>
              <h4 className="font-display text-lg text-forest hover:text-terracotta transition-colors">{item.name}</h4>
            </Link>
          </div>
          <div className="font-display text-lg text-forest font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
        
        {item.protein && (
          <div className="mb-4">
            <span className="bg-forest-light/10 text-forest text-xs font-bold px-2 py-1 rounded-md">
              {item.protein} Protein
            </span>
          </div>
        )}

        <div className="mt-auto flex items-center justify-between">
          <div className="w-32">
            <QuantitySelector 
              quantity={item.quantity} 
              onChange={(q) => updateQuantity(item.id, q)} 
            />
          </div>
          <button 
            onClick={() => removeItem(item.id)}
            className="text-slate hover:text-terracotta transition-colors p-2"
            aria-label="Remove item"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
