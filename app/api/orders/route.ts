import { NextResponse } from "next/server";
import { createPublicClient, supabaseConfigured } from "@/lib/supabase/public";

type LoggedItem = { slug: string; name: string; brand: string; price: number; quantity: number };

const isItem = (i: unknown): i is LoggedItem => {
  const o = i as LoggedItem;
  return (
    typeof o === "object" &&
    o !== null &&
    typeof o.slug === "string" && o.slug.length <= 200 &&
    typeof o.name === "string" && o.name.length <= 200 &&
    typeof o.brand === "string" && o.brand.length <= 200 &&
    Number.isInteger(o.price) && o.price >= 0 &&
    Number.isInteger(o.quantity) && o.quantity > 0 && o.quantity <= 1000
  );
};

export async function POST(request: Request) {
  // No database yet (local dev without env vars): nothing to log, not an error.
  if (!supabaseConfigured) return new NextResponse(null, { status: 204 });

  const body = await request.json().catch(() => null);
  const items: unknown = body?.items;
  if (!Array.isArray(items) || items.length === 0 || items.length > 50 || !items.every(isItem)) {
    return NextResponse.json({ error: "Invalid order" }, { status: 400 });
  }

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const { error } = await createPublicClient().from("orders").insert({ items, total });
  if (error) {
    console.error("Failed to log order:", error.message);
    return NextResponse.json({ error: "Could not log order" }, { status: 500 });
  }
  return new NextResponse(null, { status: 204 });
}
