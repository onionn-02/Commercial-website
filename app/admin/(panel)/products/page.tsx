import Link from "next/link";
import { Pencil, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";
import { ProductImage } from "@/components/product/ProductImage";
import { deleteProduct, quickUpdate } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/supabase/admin";

export default async function AdminProductsPage() {
  const { supabase } = await requireAdmin();
  const { data: products, error } = await supabase
    .from("products")
    .select("id, name, brand, size, price, in_stock, image_url, category_slug")
    .order("brand")
    .order("name");
  if (error) throw new Error(error.message);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Products ({products.length})</h1>
        <Link href="/admin/products/new" className={buttonVariants({ size: "lg" })}>
          <Plus /> Add product
        </Link>
      </div>

      {products.length === 0 && <p className="py-12 text-center text-zinc-600">No products yet.</p>}

      <ul className="mt-4 space-y-3">
        {products.map((p) => (
          <li key={p.id} className="flex flex-col gap-3 rounded-xl border bg-white p-3 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <ProductImage
                src={p.image_url ?? undefined}
                alt=""
                sizes="64px"
                className="size-16 shrink-0 rounded-lg"
              />
              <div className="min-w-0">
                <p className="truncate font-semibold">
                  {p.brand} {p.name}
                </p>
                <p className="text-xs text-zinc-500">
                  {p.size ? `${p.size} · ` : ""}
                  {p.category_slug}
                </p>
              </div>
            </div>

            {/* Quick price / stock edit */}
            <form action={quickUpdate} className="flex flex-wrap items-center gap-2">
              <input type="hidden" name="id" value={p.id} />
              <label className="flex items-center gap-1 text-sm">
                ₹
                <input
                  name="price"
                  type="number"
                  min={0}
                  step={1}
                  defaultValue={p.price}
                  aria-label={`Price of ${p.name}`}
                  className="h-9 w-24 rounded-lg border px-2"
                />
              </label>
              <label className="flex items-center gap-1 text-sm">
                <input name="inStock" type="checkbox" defaultChecked={p.in_stock} className="size-4" />
                In stock
              </label>
              <Button type="submit" size="lg">
                Save
              </Button>
            </form>

            <div className="flex gap-2">
              <Link
                href={`/admin/products/${p.id}/edit`}
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <Pencil /> Edit
              </Link>
              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <DeleteProductButton name={`${p.brand} ${p.name}`} />
              </form>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
