import type { MakerProfile } from "@/lib/makers-data";

export default function MakerStory({ maker }: { maker: MakerProfile }) {
  return (
    <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-14">
      <div>
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          Her story
        </span>
        <h2 className="text-[28px] sm:text-[34px] mt-1.5 mb-5">
          The craft behind {maker.shopName}
        </h2>
        <div className="flex flex-col gap-5 max-w-[68ch]">
          {maker.story.map((paragraph, i) => (
            <p key={i} className="text-[15.5px] text-ink/90 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <aside className="lg:sticky lg:top-[92px] h-fit">
        <blockquote className="rounded-lg bg-grove text-linen px-7 py-8 shadow-sm relative">
          <span className="font-serif text-[52px] leading-none text-aurum-soft absolute top-4 left-6 opacity-60">
            &ldquo;
          </span>
          <p className="font-serif italic text-[19px] leading-snug relative z-10 mt-4">
            {maker.pullQuote}
          </p>
          <footer className="text-sage/80 text-[12.5px] mt-5">
            — {maker.personName}, {maker.village}
          </footer>
        </blockquote>
      </aside>
    </div>
  );
}
