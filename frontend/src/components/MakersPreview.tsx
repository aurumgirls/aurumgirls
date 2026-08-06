"use client";

import { Star } from 'lucide-react';

const reviews = [
  { name: 'Sarah M.', flavor: 'Vanilla Bean', rating: 5, text: 'This is the thickest, creamiest yogurt I have ever had! I love that it is organic and packed with protein.' },
  { name: 'James T.', flavor: 'Blueberry Lemon', rating: 5, text: 'The blueberry lemon flavor is incredible. Just the right amount of tartness and sweetness.' },
  { name: 'Emily R.', flavor: 'Plain', rating: 5, text: 'Perfect base for my smoothies and bowls. It feels great supporting a women-owned family farm!' },
];

export default function MakersPreview() {
  return (
    <section className="py-20 bg-linen">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display text-forest text-center mb-12">
          What the Flock is Saying
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-soft">
              <div className="flex text-terracotta mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-slate mb-6 italic">&quot;{review.text}&quot;</p>
              <div>
                <p className="font-bold text-charcoal">{review.name}</p>
                <p className="text-sm text-slate">Verified Buyer - {review.flavor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
