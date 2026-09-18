import type { Product } from "@/lib/types";

export const sortOptions = [
  { value: "", label: "Featured" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
] as const;

export type ShopFilters = {
  q: string;
  category: string;
  brand: string;
  min?: number;
  max?: number;
  sort: string;
};

type RawParams = { [key: string]: string | string[] | undefined };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

const toPrice = (v: string) => {
  const n = Number(v);
  return v.trim() !== "" && Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined;
};

export function parseFilters(params: RawParams): ShopFilters {
  return {
    q: first(params.q).trim().slice(0, 100),
    category: first(params.category),
    brand: first(params.brand),
    min: toPrice(first(params.min)),
    max: toPrice(first(params.max)),
    sort: first(params.sort),
  };
}

// Catalog is small (a single shop), so filtering in memory is simpler and safer than building DB queries.
export function applyFilters(products: Product[], f: ShopFilters): Product[] {
  const terms = f.q.toLowerCase().split(/\s+/).filter(Boolean);

  const result = products.filter((p) => {
    if (f.category && p.category !== f.category) return false;
    if (f.brand && p.brand !== f.brand) return false;
    if (f.min !== undefined && p.price < f.min) return false;
    if (f.max !== undefined && p.price > f.max) return false;
    if (terms.length) {
      const haystack = [p.name, p.brand, p.size, p.description, ...(p.compatibleWith ?? [])]
        .join(" ")
        .toLowerCase();
      if (!terms.every((t) => haystack.includes(t))) return false;
    }
    return true;
  });

  if (f.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  else if (f.sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
  return result;
}

// Build a /shop URL from the current filters with some values overridden (used by category chips).
export function shopHref(f: ShopFilters, override: Partial<ShopFilters> = {}) {
  const merged = { ...f, ...override };
  const qs = new URLSearchParams();
  if (merged.q) qs.set("q", merged.q);
  if (merged.category) qs.set("category", merged.category);
  if (merged.brand) qs.set("brand", merged.brand);
  if (merged.min !== undefined) qs.set("min", String(merged.min));
  if (merged.max !== undefined) qs.set("max", String(merged.max));
  if (merged.sort) qs.set("sort", merged.sort);
  const s = qs.toString();
  return s ? `/shop?${s}` : "/shop";
}

export const hasActiveFilters = (f: ShopFilters) =>
  Boolean(f.q || f.category || f.brand || f.min !== undefined || f.max !== undefined);
