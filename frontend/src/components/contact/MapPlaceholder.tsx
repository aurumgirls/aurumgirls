"use client";

import { MapPin } from 'lucide-react';

export default function MapPlaceholder() {
  return (
    <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-soft border border-sand bg-linen flex items-center justify-center">
      {/* Decorative background representing a map */}
      <div className="absolute inset-0 opacity-10 bg-[url('/images/farm-landscape.jpg')] bg-cover bg-center mix-blend-luminosity"></div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#EAE5D9 1px, transparent 1px), linear-gradient(90deg, #EAE5D9 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      
      <div className="relative z-10 flex flex-col items-center p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft max-w-sm text-center transform -translate-y-4">
        <div className="w-12 h-12 bg-terracotta rounded-full flex items-center justify-center text-cream mb-4 shadow-md animate-bounce">
          <MapPin size={24} />
        </div>
        <h4 className="text-xl font-display text-forest mb-2">Painterland Sisters Farm</h4>
        <p className="text-slate mb-4">Tioga County, PA</p>
        <p className="text-sm text-slate italic">
          * Our working farm is not open to the public, but you can find our skyr in stores nationwide!
        </p>
      </div>
    </div>
  );
}
