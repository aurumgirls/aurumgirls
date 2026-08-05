import Link from "next/link";
import { impactStats } from "@/lib/data";

export default function ImpactStats() {
  return (
    <section className="mx-auto max-w-[1160px] px-5 sm:px-7 py-14 sm:py-16">
      <div className="rounded-xl bg-grove text-linen px-6 sm:px-12 py-12 sm:py-14">
        <div className="max-w-[60ch]">
          <span className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-aurum-soft">
            Our story
          </span>
          <h2 className="text-linen text-[26px] sm:text-[34px] mt-2">
            Azerbaijan&rsquo;s ancient craft, carried forward by the women who never stopped
            making.
          </h2>
          <p className="text-sage/85 text-[15px] sm:text-[16px] mt-4 leading-relaxed">
            The kəlağayı pattern, the sourness of a Gakh jam, the weight of a hand-thrown
            pot — these are made by rural women whose skills are generations old. By Aurum
            Girls exists to bring their work to a wider table, fairly and directly.
          </p>
          <Link
            href="/about/impact"
            className="inline-flex items-center rounded-sm bg-nar text-white text-[14px] font-semibold px-5 py-2.5 mt-6 hover:bg-nar-deep transition-colors"
          >
            Read our impact
          </Link>
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
    </section>
  );
}
