import { ProductForm } from "@/components/admin/ProductForm";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function NewProductPage() {
  const { supabase } = await requireAdmin();
  const { data: categories, error } = await supabase.from("categories").select("slug, name").order("sort_order");
  if (error) throw new Error(error.message);

  return (
    <>
      <h1 className="mb-4 text-2xl font-bold">Add product</h1>
      <ProductForm categories={categories} />
    </>
  );
}
