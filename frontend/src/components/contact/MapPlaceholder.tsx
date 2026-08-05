import { ExternalLink, MapPin } from "lucide-react";

export default function MapPlaceholder() {
  return (
    <div className="rounded-lg overflow-hidden border border-black/10 shadow-sm relative h-[280px] sm:h-[340px] bg-sand">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(38,32,26,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(38,32,26,.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(192,137,46,.22), transparent 55%)" }}
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%+10px)] flex flex-col items-center">
        <span className="h-12 w-12 rounded-pill bg-nar text-white flex items-center justify-center shadow-md">
          <MapPin size={20} strokeWidth={2} />
        </span>
        <span className="mt-2 h-3 w-3 rounded-pill bg-ink/15 blur-[1px]" />
      </div>

      <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-[320px] rounded-md bg-cream/95 backdrop-blur px-4 py-3.5 shadow-md flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[13.5px] font-semibold text-ink truncate">By Aurum Girls HQ</p>
          <p className="text-[12px] text-stone truncate">28 Nizami Street, Baku</p>
        </div>
        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Open in Google Maps"
          className="h-9 w-9 shrink-0 inline-flex items-center justify-center rounded-pill bg-sand text-ink hover:bg-kraft/40 transition-colors"
        >
          <ExternalLink size={15} strokeWidth={1.9} />
        </a>
      </div>
    </div>
  );
}
