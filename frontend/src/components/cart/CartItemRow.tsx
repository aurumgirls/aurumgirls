"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";

export function CartItemRow() {
  return (
    <div className="flex gap-4 sm:gap-6 py-6 border-b border-sand">
      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-vanilla rounded-xl flex-shrink-0 relative">
        <Image src="/images/yogurt-strawberry.jpg" alt="Strawberry Skyr" fill className="object-contain p-2" unoptimized />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div>
            <Link href="/product/strawberry-skyr">
              <h3 className="font-display text-lg sm:text-xl text-forest hover:text-terracotta transition-colors">Strawberry Skyr</h3>
            </Link>
            <p className="text-slate text-sm mt-1">Single Cup</p>
          </div>
          <button className="text-slate hover:text-terracotta transition-colors p-1">
            <Trash2 size={20} />
          </button>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center bg-cream border border-sand rounded-full">
            <button className="w-8 h-8 flex items-center justify-center text-forest hover:text-terracotta transition-colors">
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium text-sm">2</span>
            <button className="w-8 h-8 flex items-center justify-center text-forest hover:text-terracotta transition-colors">
              <Plus size={16} />
            </button>
          </div>
          <div className="font-medium text-lg text-forest">$18.00</div>
        </div>
      </div>
    </div>
  );
}
