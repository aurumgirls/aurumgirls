"use client";

export default function Gallery() {
  const items = [
    { title: "Pasture", color: "bg-[#BAC7E8]" }, // blueberry
    { title: "Creamery", color: "bg-[#F5EBE6]" }, // vanilla
    { title: "Milk Processing", color: "bg-[#F0EDE8]" }, // plain
    { title: "Cow Care", color: "bg-[#F7C5C2]" }, // strawberry
    { title: "Packaging", color: "bg-[#C68BB0]" }, // meadowberry
    { title: "Farm Life", color: "bg-[#F9C7A1]" }, // peach
  ];

  return (
    <section className="py-20 bg-linen">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display text-forest mb-4">Life on the Farm</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div 
              key={idx} 
              className={`aspect-square rounded-2xl ${item.color} shadow-soft flex items-center justify-center p-6 transition-transform hover:scale-[1.02] duration-300`}
            >
              <h3 className="text-xl md:text-2xl font-display text-forest/80 text-center">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
