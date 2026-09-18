import { cache } from "react";
import { connection } from "next/server";
import { categories as sampleCategories, products as sampleProducts } from "@/lib/sample-data";
import { createPublicClient, supabaseConfigured } from "@/lib/supabase/public";
import type { Category, Product } from "@/lib/types";

// Server-only catalog access. Reads Supabase; falls back to sample data ONLY when env vars are missing.
// If Supabase is configured but a query fails we throw, so a real outage never shows fake products.

type ProductRow = {
  slug: string;
  name: string;
  brand: string;
  category_slug: string;
  price: number;
  size: string | null;
  description: string;
  specs: { label: string; value: string }[];
  compatible_with: string[];
  in_stock: boolean;
  image_url: string | null;
};

const toProduct = (r: ProductRow): Product => ({
  slug: r.slug,
  name: r.name,
  brand: r.brand,
  category: r.category_slug,
  price: r.price,
  size: r.size ?? undefined,
  description: r.description,
  specs: r.specs ?? [],
  compatibleWith: r.compatible_with?.length ? r.compatible_with : undefined,
  inStock: r.in_stock,
  imageUrl: r.image_url ?? undefined,
});

export async function getCategories(): Promise<Category[]> {
  await connection(); // render per request so admin edits show up immediately
  if (!supabaseConfigured) return sampleCategories;

  const { data, error } = await createPublicClient()
    .from("categories")
    .select("slug, name")
    .order("sort_order");
  if (error) throw new Error(`Failed to load categories: ${error.message}`);
  return data;
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  await connection();
  if (!supabaseConfigured) {
    return categorySlug ? sampleProducts.filter((p) => p.category === categorySlug) : sampleProducts;
  }

  let query = createPublicClient().from("products").select("*").order("created_at");
  if (categorySlug) query = query.eq("category_slug", categorySlug);
  const { data, error } = await query;
  if (error) throw new Error(`Failed to load products: ${error.message}`);
  return (data as ProductRow[]).map(toProduct);
}

export const getProduct = cache(async (slug: string): Promise<Product | undefined> => {
  await connection();
  if (!supabaseConfigured) return sampleProducts.find((p) => p.slug === slug);

  const { data, error } = await createPublicClient()
    .from("products")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(`Failed to load product: ${error.message}`);
  return data ? toProduct(data as ProductRow) : undefined;
});
