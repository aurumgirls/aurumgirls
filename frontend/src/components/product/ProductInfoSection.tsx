import { Layers, Ruler, SprayCan } from "lucide-react";
import type { ProductDetail } from "@/lib/product-detail";

export default function ProductInfoSection({ product }: { product: ProductDetail }) {
  return (
    <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-14">
      <div className="flex flex-col gap-10">
        <div>
          <h2 className="text-[24px] sm:text-[28px] mb-3">Description</h2>
          <p className="text-[15.5px] text-ink/90 leading-relaxed max-w-[70ch]">
            {product.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-md bg-cream border border-black/10 p-5">
            <Layers size={18} strokeWidth={1.6} className="text-olive mb-3" />
            <h3 className="text-[13px] font-bold tracking-[0.06em] uppercase text-stone mb-2.5">
              {product.materialsLabel}
            </h3>
            <ul className="flex flex-col gap-1.5">
              {product.materials.map((m) => (
                <li key={m} className="text-[13.5px] text-ink/90 leading-snug">
                  {m}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md bg-cream border border-black/10 p-5">
            <Ruler size={18} strokeWidth={1.6} className="text-olive mb-3" />
            <h3 className="text-[13px] font-bold tracking-[0.06em] uppercase text-stone mb-2.5">
              Dimensions
            </h3>
            <p className="text-[13.5px] text-ink/90 leading-snug">{product.dimensions}</p>
          </div>

          <div className="rounded-md bg-cream border border-black/10 p-5">
            <SprayCan size={18} strokeWidth={1.6} className="text-olive mb-3" />
            <h3 className="text-[13px] font-bold tracking-[0.06em] uppercase text-stone mb-2.5">
              Care
            </h3>
            <p className="text-[13.5px] text-ink/90 leading-snug">{product.care}</p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-[24px] sm:text-[28px] mb-3">Specifications</h2>
        <dl className="rounded-md bg-cream border border-black/10 divide-y divide-dashed divide-black/10 overflow-hidden">
          {product.specs.map((spec) => (
            <div key={spec.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
              <dt className="text-[13px] text-stone">{spec.label}</dt>
              <dd className="text-[13.5px] font-medium text-ink capitalize text-right">
                {spec.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
