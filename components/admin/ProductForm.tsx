"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { saveProduct, type FormState } from "@/app/admin/actions";
import { createClient } from "@/lib/supabase/client";
import type { Category } from "@/lib/types";

export type ProductFormValues = {
  id: string;
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

const MAX_IMAGE_MB = 5;
const field = "h-10 w-full rounded-lg border bg-white px-3 text-base outline-none focus:border-orange-600";
const label = "block text-sm font-medium";

export function ProductForm({
  categories,
  product,
}: {
  categories: Category[];
  product?: ProductFormValues;
}) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveProduct, {});
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // Photos go straight from the browser to Supabase Storage (allowed for logged-in admins),
  // which avoids server upload size limits. Only the resulting URL is submitted with the form.
  async function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) return setUploadError("Please choose an image file.");
    if (file.size > MAX_IMAGE_MB * 1024 * 1024) return setUploadError(`Image must be under ${MAX_IMAGE_MB} MB.`);

    setUploading(true);
    const supabase = createClient();
    const ext = file.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      contentType: file.type,
      cacheControl: "31536000",
    });
    setUploading(false);
    if (error) return setUploadError(`Upload failed: ${error.message}`);
    setImageUrl(supabase.storage.from("product-images").getPublicUrl(path).data.publicUrl);
  }

  return (
    <form action={action} className="space-y-4 rounded-xl border bg-white p-4 sm:p-6">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input type="hidden" name="imageUrl" value={imageUrl} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className={label}>
          Brand *
          <input name="brand" required defaultValue={product?.brand} className={`${field} mt-1`} />
        </label>
        <label className={label}>
          Name *
          <input name="name" required defaultValue={product?.name} className={`${field} mt-1`} />
        </label>
        <label className={label}>
          Category *
          <select
            name="category"
            required
            defaultValue={product?.category_slug ?? ""}
            className={`${field} mt-1`}
          >
            <option value="" disabled>
              Choose...
            </option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Price (₹) *
          <input
            name="price"
            type="number"
            min={0}
            step={1}
            required
            defaultValue={product?.price}
            className={`${field} mt-1`}
          />
        </label>
        <label className={label}>
          Pack size (e.g. 1 L, Set of 2)
          <input name="size" defaultValue={product?.size ?? ""} className={`${field} mt-1`} />
        </label>
        <label className="flex items-center gap-2 pt-6 text-sm font-medium">
          <input name="inStock" type="checkbox" defaultChecked={product?.in_stock ?? true} className="size-4" />
          In stock
        </label>
      </div>

      <label className={label}>
        Description
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-base outline-none focus:border-orange-600"
        />
      </label>

      <label className={label}>
        Specifications (one per line, like <code>Grade: 10W-30</code>)
        <textarea
          name="specs"
          rows={4}
          defaultValue={product?.specs.map((s) => `${s.label}: ${s.value}`).join("\n")}
          className="mt-1 w-full rounded-lg border bg-white px-3 py-2 text-base outline-none focus:border-orange-600"
        />
      </label>

      <label className={label}>
        Compatible vehicles (separate with commas)
        <input
          name="compatibleWith"
          defaultValue={product?.compatible_with.join(", ")}
          className={`${field} mt-1`}
        />
      </label>

      <div>
        <span className={label}>Photo</span>
        {imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element -- small admin preview of an arbitrary uploaded URL
          <img src={imageUrl} alt="Product preview" className="mt-2 size-32 rounded-lg border object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={onPickImage}
          disabled={uploading}
          className="mt-2 block text-sm"
        />
        {uploading && <p className="mt-1 text-sm text-zinc-500">Uploading...</p>}
        {uploadError && <p className="mt-1 text-sm text-red-600">{uploadError}</p>}
        {imageUrl && (
          <button type="button" onClick={() => setImageUrl("")} className="mt-1 text-sm text-red-600 underline">
            Remove photo
          </button>
        )}
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      <div className="flex gap-3">
        <Button type="submit" size="lg" disabled={pending || uploading} className="h-10 px-5 text-base">
          {pending ? "Saving..." : product ? "Save changes" : "Add product"}
        </Button>
        <Link href="/admin/products" className={buttonVariants({ variant: "outline", size: "lg", className: "h-10 px-5 text-base" })}>
          Cancel
        </Link>
      </div>
    </form>
  );
}
