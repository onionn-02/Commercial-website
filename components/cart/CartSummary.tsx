"use client";

import { MessageCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import { telLink } from "@/lib/site";
import { cartTotal, orderLink } from "@/lib/whatsapp";

export function CartSummary() {
  const { items } = useCart();
  if (items.length === 0) return null;

  // Fire-and-forget log of the order attempt; must never block or break opening WhatsApp.
  const logOrder = () => {
    fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map((i) => ({ slug: i.slug, name: i.name, brand: i.brand, price: i.price, quantity: i.quantity })) }),
      keepalive: true,
    }).catch(() => {});
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-lg font-bold">
        <span>Total</span>
        <span>{formatPrice(cartTotal(items))}</span>
      </div>
      <a
        href={orderLink(items)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={logOrder}
        className={buttonVariants({ size: "lg", className: "h-11 w-full bg-green-700 text-base text-white hover:bg-green-800" })}
      >
        <MessageCircle /> Order on WhatsApp
      </a>
      <a
        href={telLink()}
        className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 w-full text-base" })}
      >
        <Phone /> Call to Order
      </a>
      <p className="text-center text-xs text-zinc-500">
        No online payment. We confirm price and availability on WhatsApp.
      </p>
    </div>
  );
}
