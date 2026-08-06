"use client";

export default function MeetTheSisters() {
  const sisters = [
    {
      name: "Stephanie Painter",
      role: "Farm Operations & Co-Founder",
      bio: '"Working with our cows and the land is in my blood. My passion is ensuring our regenerative practices not only produce the best milk, but leave our farm healthier for the next generation."',
      gradient: "from-[#F7C5C2] to-[#F09A86]" // strawberry to terracotta-light
    },
    {
      name: "Hayley Painter",
      role: "Product Development & Co-Founder",
      bio: '"I wanted to create something that tasted amazing and nourished the body. Bringing our family\'s milk to life as creamy, protein-packed skyr has been a dream come true."',
      gradient: "from-[#F9C7A1] to-[#F4A261]" // peach to honey
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-cream">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display text-forest mb-4">Meet the Sisters</h2>
          <p className="text-slate text-lg max-w-2xl mx-auto">
            Two sisters bridging the gap between a 5th generation Pennsylvania dairy farm and your fridge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {sisters.map((sister, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-6">
              <div className={`w-48 h-48 rounded-full bg-gradient-to-br ${sister.gradient} shadow-soft-lg flex items-center justify-center p-2`}>
                <div className="w-full h-full rounded-full bg-cream/50 flex items-center justify-center text-4xl font-display text-forest/50">
                  {sister.name.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-display text-forest">{sister.name}</h3>
                <p className="text-terracotta font-medium mt-1">{sister.role}</p>
              </div>
              <p className="text-slate italic max-w-sm">
                {sister.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
