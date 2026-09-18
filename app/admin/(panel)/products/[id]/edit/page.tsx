import { notFound } from "next/navigation";
import { ProductForm, type ProductFormValues } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function EditProductPage({ params }: PageProps<"/admin/products/[id]/edit">) {
  const { id } = await params;
  const { supabase } = await requireAdmin();

  const [{ data: categories, error: catError }, { data: product, error }] = await Promise.all([
    supabase.from("categories").select("slug, name").order("sort_order"),
    supabase.from("products").select("*").eq("id", id).maybeSingle(),
  ]);
  if (catError) throw new Error(catError.message);
  // A malformed id makes Postgres error; treat that the same as "not found".
  if (error || !product) notFound();

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Edit product</h1>
      <ProductForm categories={categories} product={product as ProductFormValues} />
    </>
  );
}
