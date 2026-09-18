"use server";

import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type FormState = { error?: string };

export async function login(_prev: FormState, formData: FormData): Promise<FormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Enter your email and password." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "Wrong email or password." };

  redirect("/admin/products");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// "Grade: 10W-30" per line -> [{ label, value }]
function parseSpecs(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const i = line.indexOf(":");
      return i === -1
        ? { label: line, value: "" }
        : { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
    })
    .filter((s) => s.label);
}

export async function saveProduct(_prev: FormState, formData: FormData): Promise<FormState> {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const name = String(formData.get("name") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const size = String(formData.get("size") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const price = Number(formData.get("price"));
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();

  if (!name || !brand) return { error: "Name and brand are required." };
  if (!category) return { error: "Choose a category." };
  if (!Number.isInteger(price) || price < 0) return { error: "Price must be a whole number of rupees." };

  const fields = {
    name,
    brand,
    category_slug: category,
    price,
    size: size || null,
    description,
    specs: parseSpecs(String(formData.get("specs") ?? "")),
    compatible_with: String(formData.get("compatibleWith") ?? "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean),
    in_stock: formData.get("inStock") === "on",
    image_url: imageUrl || null,
  };

  // The slug is the public URL, so it's set once on creation and never changed on edit.
  const { error } = id
    ? await supabase.from("products").update(fields).eq("id", id)
    : await supabase.from("products").insert({ ...fields, slug: slugify(`${brand} ${name} ${size}`) });

  if (error) {
    return {
      error:
        error.code === "23505"
          ? "A product with the same brand, name and size already exists."
          : `Could not save: ${error.message}`,
    };
  }
  redirect("/admin/products");
}

// Inline price / stock edit from the products list.
export async function quickUpdate(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  const price = Number(formData.get("price"));
  if (!id || !Number.isInteger(price) || price < 0) return;

  await supabase
    .from("products")
    .update({ price, in_stock: formData.get("inStock") === "on" })
    .eq("id", id);
  redirect("/admin/products");
}

export async function deleteProduct(formData: FormData) {
  const { supabase } = await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (id) await supabase.from("products").delete().eq("id", id);
  redirect("/admin/products");
}
