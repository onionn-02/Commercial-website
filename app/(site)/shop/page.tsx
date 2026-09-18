import type { Metadata } from "next";
import Link from "next/link";
import { ProductGrid } from "@/components/product/ProductGrid";
import { ShopFilters } from "@/components/product/ShopFilters";
import { getCategories, getProducts } from "@/lib/data";
import { applyFilters, hasActiveFilters, parseFilters, shopHref } from "@/lib/filters";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shop",
  description: "Browse engine oils, brake shoes, filters, batteries and spare parts. Order on WhatsApp.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const filters = parseFilters(await searchParams);
  const [categories, all] = await Promise.all([getCategories(), getProducts()]);

  const activeCategory = categories.find((c) => c.slug === filters.category);
  // Ignore a category that doesn't exist instead of showing an empty page.
  if (!activeCategory) filters.category = "";

  const brands = [...new Set(all.map((p) => p.brand))].sort();
  const visible = applyFilters(all, filters);

  const chip = (isActive: boolean) =>
    cn(
      "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium",
      isActive ? "border-orange-700 bg-orange-700 text-white" : "bg-white hover:border-orange-600",
    );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold">{activeCategory ? activeCategory.name : "Shop"}</h1>

      <div className="mt-4">
        <ShopFilters filters={filters} brands={brands} />
      </div>

      <nav aria-label="Categories" className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-2">
        <Link href={shopHref(filters, { category: "" })} className={chip(!activeCategory)}>
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={shopHref(filters, { category: c.slug })}
            className={chip(activeCategory?.slug === c.slug)}
          >
            {c.name}
          </Link>
        ))}
      </nav>

      <p className="mt-4 text-sm text-zinc-600" aria-live="polite">
        {visible.length} {visible.length === 1 ? "product" : "products"}
      </p>

      <div className="mt-3">
        <ProductGrid products={visible} filtered={hasActiveFilters(filters)} />
      </div>
    </div>
  );
}
