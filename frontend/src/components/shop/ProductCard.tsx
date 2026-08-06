"use client";

import Image from 'next/image';
import Link from 'next/link';
import { ShopProduct } from '@/lib/shop-data';
import { Star, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cart-store';

interface ProductCardProps {
  product: ShopProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Link href={`/product/${product.slug}`} className="group block h-full">
      <div className="bg-white rounded-2xl overflow-hidden border border-sand transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-soft-lg h-full flex flex-col relative">
        {product.isNew && (
          <div className="absolute top-4 left-4 z-10 bg-terracotta text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            New
          </div>
        )}
        
        <div 
          className="relative aspect-square p-6 flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: product.flavorColor || '#F5EBE6' }}
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              unoptimized
              className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/40 backdrop-blur-sm flex items-center justify-center shadow-soft">
              <span className="font-display text-forest text-xl text-center px-4 leading-tight">Painterland<br/>Sisters</span>
            </div>
          )}
        </div>

        <div className="p-5 flex flex-col flex-grow bg-cream">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-slate text-xs uppercase tracking-wider font-semibold mb-1">{product.category}</p>
              <h3 className="font-display text-forest text-xl mb-1">{product.name}</h3>
            </div>
            {product.protein && (
              <span className="bg-forest-light/10 text-forest text-xs font-bold px-2 py-1 rounded-md ml-2 flex-shrink-0">
                {product.protein} Protein
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "w-3.5 h-3.5",
                  i < Math.floor(product.rating) ? "text-honey fill-honey" : "text-sand fill-sand"
                )}
              />
            ))}
            <span className="text-slate text-xs ml-1">({product.reviews})</span>
          </div>

          <div className="mt-auto pt-4 border-t border-sand flex items-center justify-between">
            <span className="font-display text-forest text-lg font-medium">${product.price.toFixed(2)}</span>
            <button
              onClick={handleAddToCart}
              className="bg-cream hover:bg-terracotta text-terracotta hover:text-white border border-terracotta rounded-full w-8 h-8 flex items-center justify-center transition-colors shadow-sm"
              aria-label={`Add ${product.name} to cart`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
