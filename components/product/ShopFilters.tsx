import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sortOptions, type ShopFilters as Filters } from "@/lib/filters";

const field = "h-10 w-full rounded-lg border bg-white px-3 text-base outline-none focus:border-orange-600";

// Plain GET form: works without JavaScript and keeps every filter in the URL (shareable, back-button friendly).
export function ShopFilters({ filters, brands }: { filters: Filters; brands: string[] }) {
  const advancedActive = Boolean(filters.brand || filters.min !== undefined || filters.max !== undefined || filters.sort);

  return (
    <form action="/shop" method="get" role="search" className="space-y-3">
      {filters.category && <input type="hidden" name="category" value={filters.category} />}

      <div className="flex gap-2">
        <label className="relative flex-1">
          <span className="sr-only">Search products</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <input
            name="q"
            type="search"
            defaultValue={filters.q}
            placeholder="Search oil, brake shoe, Splendor..."
            className={`${field} pl-9`}
          />
        </label>
        <Button type="submit" size="lg" className="h-10 px-4 text-base">
          Search
        </Button>
      </div>

      <details open={advancedActive} className="rounded-lg border bg-white">
        <summary className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm font-medium">
          <SlidersHorizontal className="size-4" /> Filters &amp; sort
        </summary>
        <div className="grid gap-3 border-t p-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="text-sm font-medium">
            Brand
            <select name="brand" defaultValue={filters.brand} className={`${field} mt-1`}>
              <option value="">All brands</option>
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium">
            Min price (₹)
            <input name="min" type="number" min={0} defaultValue={filters.min} className={`${field} mt-1`} />
          </label>
          <label className="text-sm font-medium">
            Max price (₹)
            <input name="max" type="number" min={0} defaultValue={filters.max} className={`${field} mt-1`} />
          </label>
          <label className="text-sm font-medium">
            Sort by
            <select name="sort" defaultValue={filters.sort} className={`${field} mt-1`}>
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </label>
          <div className="flex items-center gap-3 sm:col-span-2 lg:col-span-4">
            <Button type="submit" size="lg" className="h-10 px-4 text-base">
              Apply
            </Button>
            <Link href="/shop" className="text-sm text-zinc-600 underline">
              Clear all
            </Link>
          </div>
        </div>
      </details>
    </form>
  );
}
