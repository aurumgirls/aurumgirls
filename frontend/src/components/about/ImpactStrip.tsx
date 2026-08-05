import { impactStats } from "@/lib/data";

export default function ImpactStrip() {
  return (
    <div className="rounded-xl bg-grove text-linen px-6 sm:px-12 py-12 sm:py-14">
      <div className="max-w-[60ch]">
        <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-aurum-soft">
          The impact so far
        </span>
        <h2 className="text-linen text-[26px] sm:text-[34px] mt-2">
          Numbers only matter because a woman is behind every one of them.
        </h2>
        <p className="text-sage/85 text-[15px] sm:text-[16px] mt-4 leading-relaxed">
          Every statistic here represents a maker who set her own price, kept the
          majority of the sale, and decided for herself how to grow her shop.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-10 pt-8 border-t border-sage/15">
        {impactStats.map((s) => (
          <div key={s.label}>
            <p className="font-serif text-[30px] sm:text-[36px] leading-none">{s.value}</p>
            <p className="text-sage/80 text-[13px] mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
