import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/site";
import type { CartItem } from "@/lib/types";

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function orderMessage(items: CartItem[]) {
  const lines = items.map((i) => {
    const label = i.size ? `${i.brand} ${i.name} (${i.size})` : `${i.brand} ${i.name}`;
    return `${i.quantity}x ${label} - ${formatPrice(i.price * i.quantity)}`;
  });
  return `Hi, I'd like to order:\n${lines.join("\n")}\nTotal: ${formatPrice(cartTotal(items))}`;
}

export const orderLink = (items: CartItem[]) => whatsappLink(orderMessage(items));
