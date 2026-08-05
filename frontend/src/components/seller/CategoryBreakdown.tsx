const BAR_COLORS = ["bg-nar", "bg-aurum", "bg-olive", "bg-kraft"];

export default function CategoryBreakdown({ data }: { data: { label: string; value: number }[] }) {
  return (
    <div className="flex flex-col gap-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="flex items-center justify-between text-[13px] mb-1.5">
            <span className="text-ink font-medium">{d.label}</span>
            <span className="text-stone">{d.value}%</span>
          </div>
          <div className="h-2 rounded-pill bg-sand overflow-hidden">
            <div
              className={`h-full rounded-pill ${BAR_COLORS[i % BAR_COLORS.length]}`}
              style={{ width: `${d.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
