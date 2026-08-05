"use client";

import { useState } from "react";
import { Check, Download, type LucideIcon } from "lucide-react";

export default function ReportCard({
  icon: Icon,
  title,
  description,
  stat,
  statLabel,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  stat: string;
  statLabel: string;
}) {
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    setGenerated(true);
    window.setTimeout(() => setGenerated(false), 2400);
  };

  return (
    <div className="rounded-lg bg-cream border border-black/10 shadow-sm p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <span className="h-11 w-11 shrink-0 rounded-pill bg-sand text-ink flex items-center justify-center">
          <Icon size={18} strokeWidth={1.8} />
        </span>
        <div className="text-right">
          <p className="font-serif text-[22px] leading-none">{stat}</p>
          <p className="text-[11.5px] text-stone mt-1.5">{statLabel}</p>
        </div>
      </div>
      <div>
        <h3 className="text-[17px]">{title}</h3>
        <p className="text-[13px] text-stone mt-1">{description}</p>
      </div>
      <button
        onClick={handleGenerate}
        className={`inline-flex items-center justify-center gap-2 rounded-sm text-[13.5px] font-semibold px-4 py-2.5 mt-1 transition-colors ${
          generated ? "bg-olive text-white" : "bg-nar text-white hover:bg-nar-deep"
        }`}
      >
        {generated ? <Check size={15} strokeWidth={2.4} /> : <Download size={15} strokeWidth={2} />}
        {generated ? "Report ready" : "Generate report"}
      </button>
    </div>
  );
}
