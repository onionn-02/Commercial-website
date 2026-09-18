import { formatPrice } from "@/lib/format";
import { requireAdmin } from "@/lib/supabase/admin";

type OrderItem = { name: string; brand: string; price: number; quantity: number };

export default async function AdminOrdersPage() {
  const { supabase } = await requireAdmin();
  const { data: orders, error } = await supabase
    .from("orders")
    .select("id, items, total, created_at")
    .order("created_at", { ascending: false })
    .limit(100);
  if (error) throw new Error(error.message);

  return (
    <>
      <h1 className="text-2xl font-bold">Recent orders</h1>
      <p className="mt-1 text-sm text-zinc-600">
        Every time a customer taps &quot;Order on WhatsApp&quot;. Not confirmed sales: check WhatsApp for the actual order.
      </p>

      {orders.length === 0 && <p className="py-12 text-center text-zinc-600">No orders yet.</p>}

      <ul className="mt-4 space-y-3">
        {orders.map((o) => (
          <li key={o.id} className="rounded-xl border bg-white p-4">
            <div className="flex items-center justify-between text-sm">
              <time dateTime={o.created_at} className="text-zinc-500">
                {new Date(o.created_at).toLocaleString("en-IN", {
                  timeZone: "Asia/Kolkata",
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </time>
              <span className="font-bold">{formatPrice(o.total)}</span>
            </div>
            <ul className="mt-2 text-sm">
              {(o.items as OrderItem[]).map((i, idx) => (
                <li key={idx}>
                  {i.quantity}x {i.brand} {i.name}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
