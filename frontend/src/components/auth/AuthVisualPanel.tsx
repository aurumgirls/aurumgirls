import Image from "next/image";

export default function AuthVisualPanel() {
  return (
    <div className="relative hidden lg:flex lg:w-[46%] xl:w-[44%] flex-col justify-between overflow-hidden p-12 xl:p-14">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(155deg, #33432A 0%, #5E6E3A 55%, #A83A2B 130%)" }}
      />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay bg-[radial-gradient(circle_at_25%_15%,#fff,transparent_55%)]" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />

      <div className="relative z-10 flex items-center gap-2.5">
        <Image src="/images/logo-white.png" alt="By Aurum Girls" width={34} height={34} className="h-8 w-8" />
        <span className="font-serif text-[18px] text-linen">By Aurum Girls</span>
      </div>

      <div className="relative z-10 max-w-[380px]">
        <span className="inline-flex items-center gap-2 text-[11.5px] font-semibold tracking-[0.22em] uppercase text-aurum-soft mb-5">
          <span className="h-px w-6 bg-aurum-soft" />
          Handmade in Azerbaijan
        </span>
        <p className="font-serif italic text-[26px] xl:text-[28px] text-linen leading-snug">
          &ldquo;A slight variation in the dye is proof that a hand made it, not a machine.&rdquo;
        </p>
        <p className="text-sage/80 text-[13.5px] mt-4">— Basti Hüseynova, weaver, Basqal</p>

        <div className="flex items-center gap-6 mt-9 pt-7 border-t border-linen/15">
          <div>
            <p className="font-serif text-[24px] text-linen leading-none">180+</p>
            <p className="text-sage/75 text-[11.5px] mt-1.5">Village makers</p>
          </div>
          <div>
            <p className="font-serif text-[24px] text-linen leading-none">23</p>
            <p className="text-sage/75 text-[11.5px] mt-1.5">Regions</p>
          </div>
          <div>
            <p className="font-serif text-[24px] text-linen leading-none">4.9★</p>
            <p className="text-sage/75 text-[11.5px] mt-1.5">Avg. rating</p>
          </div>
        </div>
      </div>

      <p className="relative z-10 text-linen/50 text-[12px]">
        © {new Date().getFullYear()} By Aurum Girls. Proudly handmade in Azerbaijan.
      </p>
    </div>
  );
}
