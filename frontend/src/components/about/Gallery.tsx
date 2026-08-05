import { makerProfiles } from "@/lib/makers-data";

const TILES: { label: string; caption: string; swatch: [string, string]; span: string }[] = [
  {
    label: "Basqal",
    caption: "Kəlağayı silk weaving",
    swatch: makerProfiles.find((m) => m.slug === "basti-huseynova")!.swatch,
    span: "sm:col-span-2 sm:row-span-2",
  },
  {
    label: "Gakh",
    caption: "Copper-pot preserves",
    swatch: makerProfiles.find((m) => m.slug === "zeyneb-eliyeva")!.swatch,
    span: "",
  },
  {
    label: "Lahıc",
    caption: "Wild-herb foraging",
    swatch: makerProfiles.find((m) => m.slug === "nergiz-quliyeva")!.swatch,
    span: "",
  },
  {
    label: "Ismayıllı",
    caption: "Wheel-thrown pottery",
    swatch: makerProfiles.find((m) => m.slug === "aygun-memmedova")!.swatch,
    span: "sm:row-span-2",
  },
  {
    label: "Sheki",
    caption: "Traditional pakhlava",
    swatch: makerProfiles.find((m) => m.slug === "sebine-huseynli")!.swatch,
    span: "",
  },
  {
    label: "Quba",
    caption: "Small-batch fruit preserving",
    swatch: makerProfiles.find((m) => m.slug === "xedice-rzayeva")!.swatch,
    span: "",
  },
  {
    label: "Basqal",
    caption: "Tekelduz hand embroidery",
    swatch: makerProfiles.find((m) => m.slug === "firuze-guliyeva")!.swatch,
    span: "sm:col-span-2",
  },
];

export default function Gallery() {
  return (
    <div>
      <div className="mb-7">
        <span className="text-[11.5px] font-semibold tracking-[0.14em] uppercase text-aurum">
          From the villages
        </span>
        <h2 className="text-[26px] sm:text-[34px] mt-1">A glimpse into where it&rsquo;s made</h2>
        <p className="text-stone text-[15px] max-w-[64ch] mt-3 leading-relaxed">
          Real photography from each workshop is on its way — for now, every tile below
          carries the colors and craft of the region it represents.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 auto-rows-[130px] sm:auto-rows-[150px] gap-3 sm:gap-4">
        {TILES.map((t, i) => (
          <div
            key={`${t.label}-${i}`}
            className={`relative rounded-md overflow-hidden ${t.span}`}
          >
            <div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${t.swatch[0]}, ${t.swatch[1]})` }}
            />
            <div className="absolute inset-0 opacity-[0.1] mix-blend-overlay bg-[radial-gradient(circle_at_30%_20%,#fff,transparent_60%)]" />
            <div className="absolute bottom-0 left-0 right-0 px-3.5 py-3 bg-gradient-to-t from-ink/70 to-transparent">
              <p className="text-linen text-[13px] font-semibold leading-tight">{t.label}</p>
              <p className="text-linen/80 text-[11px] mt-0.5 leading-tight">{t.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
