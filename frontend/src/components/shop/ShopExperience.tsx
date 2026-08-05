"use client";

import { useMemo, useState } from "react";
import { shopCategories, shopProducts, priceBounds, type Availability } from "@/lib/shop-data";
import ShopFilters from "./ShopFilters";
import ShopToolbar, { type SortValue, type Chip } from "./ShopToolbar";
import CategoryStrip from "./CategoryStrip";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";
import { PackageSearch } from "lucide-react";

const PAGE_SIZE = 12;

export default function ShopExperience() {
  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([priceBounds.min, priceBounds.max]);
  const [selectedAvailability, setSelectedAvailability] = useState<Availability[]>([]);
  const [sort, setSort] = useState<SortValue>("featured");
  const [page, setPage] = useState(1);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const p of shopProducts) counts[p.category] = (counts[p.category] ?? 0) + 1;
    return counts;
  }, []);

  const toggleCategory = (slug: string) => {
    setPage(1);
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const toggleAvailability = (value: Availability) => {
    setPage(1);
    setSelectedAvailability((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = shopProducts.filter((p) => {
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.maker.toLowerCase().includes(q) ||
        p.region.toLowerCase().includes(q);
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesAvailability =
        selectedAvailability.length === 0 || selectedAvailability.includes(p.availability);
      return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    list = [...list];
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating || b.reviews - a.reviews);
        break;
      case "newest":
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.id - a.id);
        break;
      default:
        list.sort((a, b) => Number(b.isNew) - Number(a.isNew) || a.id - b.id);
    }
    return list;
  }, [search, selectedCategories, priceRange, selectedAvailability, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const priceIsDefault = priceRange[0] === priceBounds.min && priceRange[1] === priceBounds.max;

  const chips: Chip[] = [
    ...selectedCategories.map((slug) => ({
      key: `cat-${slug}`,
      label: shopCategories.find((c) => c.slug === slug)?.name ?? slug,
      onRemove: () => toggleCategory(slug),
    })),
    ...selectedAvailability.map((a) => ({
      key: `av-${a}`,
      label: a.replace("-", " "),
      onRemove: () => toggleAvailability(a),
    })),
    ...(priceIsDefault
      ? []
      : [
          {
            key: "price",
            label: `₼${priceRange[0]} – ₼${priceRange[1]}`,
            onRemove: () => setPriceRange([priceBounds.min, priceBounds.max]),
          },
        ]),
    ...(search
      ? [{ key: "search", label: `"${search}"`, onRemove: () => setSearch("") }]
      : []),
  ];

  const activeCount = selectedCategories.length + selectedAvailability.length + (priceIsDefault ? 0 : 1);

  const clearAll = () => {
    setSearch("");
    setSelectedCategories([]);
    setSelectedAvailability([]);
    setPriceRange([priceBounds.min, priceBounds.max]);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} />
      </div>

      <CategoryStrip selected={selectedCategories} onToggle={toggleCategory} />

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <ShopFilters
          categoryCounts={categoryCounts}
          selectedCategories={selectedCategories}
          onToggleCategory={toggleCategory}
          priceRange={priceRange}
          onPriceChange={(r) => { setPriceRange(r); setPage(1); }}
          selectedAvailability={selectedAvailability}
          onToggleAvailability={toggleAvailability}
          onClear={clearAll}
          activeCount={activeCount}
        />

        <div>
          <ShopToolbar
            resultCount={filtered.length}
            sort={sort}
            onSortChange={setSort}
            chips={chips}
            onClearAll={clearAll}
          />

          {paged.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {paged.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 rounded-lg bg-cream border border-black/10">
              <PackageSearch size={34} strokeWidth={1.5} className="text-stone mb-3" />
              <p className="font-serif text-[20px] text-ink">No products match these filters</p>
              <p className="text-stone text-[14px] mt-1 max-w-[38ch]">
                Try widening your price range or clearing a filter to see more of the collection.
              </p>
              <button
                onClick={clearAll}
                className="mt-5 inline-flex items-center rounded-pill bg-nar text-white text-[13.5px] font-semibold px-5 py-2.5 hover:bg-nar-deep transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onChange={(p) => {
              setPage(p);
              if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </div>
      </div>
    </div>
  );
}
