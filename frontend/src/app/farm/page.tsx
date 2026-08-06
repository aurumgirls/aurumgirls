"use client";

import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Leaf, Droplets, Sprout, ShieldCheck, ArrowRight } from 'lucide-react';

export default function OurFarmPage() {
  const pillars = [
    {
      icon: <Sprout size={32} />,
      title: "Soil Health",
      description: "We use regenerative practices like no-till farming and cover cropping to build organic matter in our soil. Healthy soil means healthier forage for our cows, which translates to more nutrient-dense milk."
    },
    {
      icon: <Leaf size={32} />,
      title: "Rotational Grazing",
      description: "Our cows are moved to fresh pasture daily. This mimics natural herd behavior, allowing pastures to rest and recover, while preventing overgrazing and naturally fertilizing the land."
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Animal Welfare",
      description: "Happy cows make better milk. Our herd spends most of the year on pasture, enjoying the sun and fresh air. We prioritize their health, comfort, and natural behaviors above all else."
    },
    {
      icon: <Droplets size={32} />,
      title: "Water Conservation",
      description: "By building healthy soil and maintaining robust root systems in our pastures, we improve water retention on our farm, reducing runoff and protecting local watersheds in Pennsylvania."
    }
  ];

  return (
    <>
      <Header />
      <main className="bg-cream min-h-screen">
        
        {/* Hero */}
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <Image 
            src="/images/farm-landscape.jpg" 
            alt="Painterland Sisters Farm in Tioga County" 
            fill 
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-forest/50"></div>
          <div className="relative z-10 text-center text-cream px-4 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display mb-6">
              Regenerative Farming at Painterland
            </h1>
            <p className="text-xl md:text-2xl opacity-90 font-light">
              Healing the earth, one pasture at a time.
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-display text-forest">Deep Roots in Tioga County</h2>
              <p className="text-lg text-slate leading-relaxed">
                Our farm is nestled in the rolling hills of Tioga County, Pennsylvania. For five generations, our family has worked this land. Today, we manage our farm with a focus on regenerative agriculture—a holistic approach to farming that seeks to improve the resources it uses, rather than depleting them. We believe that producing the best skyr starts long before the milk reaches the creamery; it starts in the soil.
              </p>
            </div>
          </div>
        </section>

        {/* Pillars Grid */}
        <section className="py-20 bg-linen">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display text-forest">Our Regenerative Practices</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
              {pillars.map((pillar, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl shadow-soft border border-sand hover:shadow-soft-lg transition-shadow">
                  <div className="w-16 h-16 bg-honey/20 rounded-full flex items-center justify-center text-honey mb-6">
                    {pillar.icon}
                  </div>
                  <h3 className="text-2xl font-display text-forest mb-4">{pillar.title}</h3>
                  <p className="text-slate leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-forest text-cream border-y-8 border-sand">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-display mb-12">Our Environmental Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-terracotta-light">100%</div>
                <div className="text-sm uppercase tracking-wider text-linen/80">Organic Land</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-terracotta-light">0</div>
                <div className="text-sm uppercase tracking-wider text-linen/80">Synthetic Pesticides</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-terracotta-light">365</div>
                <div className="text-sm uppercase tracking-wider text-linen/80">Days of Care</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-display mb-2 text-terracotta-light">5</div>
                <div className="text-sm uppercase tracking-wider text-linen/80">Generations Deep</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-4xl font-display text-forest mb-6">Taste the Difference</h2>
            <p className="text-xl text-slate mb-10 max-w-2xl mx-auto">
              Experience the rich, creamy texture that comes from milk produced by cows raised in harmony with nature.
            </p>
            <Link 
              href="/shop" 
              className="inline-flex items-center justify-center bg-terracotta hover:bg-terracotta-light text-cream px-10 py-4 rounded-full font-medium transition-colors duration-300 text-lg shadow-soft hover:shadow-soft-lg"
            >
              Shop Our Skyr
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
        
      </main>
      <Footer />
    </>
  );
}
