export default function SalesChart({ data, currency = "₼" }: { data: { label: string; value: number }[]; currency?: string }) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end justify-between gap-3 h-[180px] px-1">
      {data.map((d, i) => {
        const isLast = i === data.length - 1;
        const heightPct = Math.max((d.value / max) * 100, 4);
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
            <span className="text-[11px] font-semibold text-stone opacity-0 group-hover:opacity-100 transition-opacity">
              {currency}
              {d.value}
            </span>
            <div className="w-full flex justify-center h-full items-end">
              <div
                className={`w-full max-w-[38px] rounded-t-xs transition-all ${
                  isLast ? "bg-nar" : "bg-aurum-soft group-hover:bg-aurum"
                }`}
                style={{ height: `${heightPct}%` }}
              />
            </div>
            <span className="text-[11px] text-stone">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
