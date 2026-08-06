import Link from 'next/link';
import { Heart } from 'lucide-react';

export function BrandCard() {
  return (
    <div className="bg-cream rounded-3xl p-6 border border-sand">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-forest text-cream flex items-center justify-center flex-shrink-0">
          <Heart className="w-8 h-8" />
        </div>
        
        <div>
          <h3 className="font-display text-xl text-forest mb-1">About Painterland Sisters</h3>
          <p className="text-sm text-terracotta font-medium mb-3">Family Farm in Tioga County, PA</p>
          <p className="text-slate text-sm mb-4 leading-relaxed">
            We are two sisters on a mission to connect consumers to the direct source of their food. Our organic skyr yogurt is made with milk from our family farm, using regenerative farming practices to nourish both you and the earth.
          </p>
          
          <Link 
            href="/about" 
            className="inline-block px-5 py-2 rounded-full border border-forest text-forest hover:bg-forest hover:text-white transition-colors text-sm font-medium"
          >
            Our Story
          </Link>
        </div>
      </div>
    </div>
  );
}
