/**
 * Matches ProductCard's box model so the grid does not reflow when real
 * products replace the placeholders.
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-sand h-full flex flex-col">
      <div className="aspect-square w-full bg-linen animate-pulse" />
      <div className="p-5 flex flex-col grow bg-cream">
        <div className="h-6 w-3/4 rounded-full bg-linen animate-pulse" />
        <div className="mt-auto pt-4 border-t border-sand flex items-center justify-between">
          <div className="h-5 w-20 rounded-full bg-linen animate-pulse" />
          <div className="h-8 w-8 rounded-full bg-linen animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
