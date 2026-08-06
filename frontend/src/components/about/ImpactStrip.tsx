"use client";

export default function ImpactStrip() {
  const stats = [
    { value: "100+", label: "Years of Farming" },
    { value: "5th", label: "Generation Family Farm" },
    { value: "100%", label: "Organic Certified" },
    { value: "Small", label: "Batch Crafted" },
  ];

  return (
    <section className="bg-forest py-12 border-y-8 border-sand">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-forest-light">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4">
              <span className="text-3xl md:text-4xl lg:text-5xl font-display text-cream mb-2">
                {stat.value}
              </span>
              <span className="text-sm md:text-base text-linen/80 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
