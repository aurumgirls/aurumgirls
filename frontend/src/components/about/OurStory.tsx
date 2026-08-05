export default function OurStory() {
  return (
    <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-center">
      <div className="order-2 lg:order-1">
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          How we started
        </span>
        <h2 className="text-[26px] sm:text-[34px] mt-2">
          A marketplace built after watching a jar of jam sell for ten times what its
          maker was paid.
        </h2>
        <div className="text-stone text-[15px] sm:text-[16px] mt-5 leading-relaxed space-y-4">
          <p>
            By Aurum Girls began with a simple, frustrating observation: rural women across
            Azerbaijan were making extraordinary things — kəlağayı silk scarves, wild-foraged
            teas, jam cooked in copper pots the way their grandmothers taught them — and
            almost none of the money from selling that work was reaching their hands.
            Middlemen bought low in the villages and sold high in the cities, and the women
            who did the actual work were the ones least able to negotiate.
          </p>
          <p>
            We started small, working with a handful of makers in Basqal, Gakh, and Lahıc who
            were willing to try something different: photograph their own work, set their own
            prices, and sell it directly to people who cared about the story behind it. Word
            spread village to village faster than we expected.
          </p>
          <p>
            Today, By Aurum Girls is home to artisans across more than twenty regions of
            Azerbaijan, each running her own shop, keeping the majority of every sale, and
            telling her own story in her own words. We handle the platform. She keeps the
            craft, the pricing, and the credit.
          </p>
        </div>
      </div>

      <div className="order-1 lg:order-2 relative h-[280px] sm:h-[360px] rounded-lg overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #A83A2B 0%, #7E2A20 55%, #26201A 100%)" }}
        />
        <div className="absolute inset-0 opacity-[0.14] mix-blend-overlay bg-[radial-gradient(circle_at_25%_75%,#fff,transparent_60%)]" />
        <div className="absolute top-5 left-5 right-5 sm:right-auto sm:max-w-[70%] rounded-md bg-cream/95 backdrop-blur px-4 py-3 shadow-md">
          <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-aurum">Since 2016</p>
          <p className="font-serif text-[16px] text-ink leading-snug mt-1">
            Founded with a handful of village makers, now serving artisans nationwide.
          </p>
        </div>
      </div>
    </div>
  );
}
