"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/lib/types";

export function CartItemRow({ item, onNavigate }: { item: CartItem; onNavigate?: () => void }) {
  const { setQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-3 border-b py-3">
      <div className="min-w-0 flex-1">
        <Link
          href={`/shop/${item.slug}`}
          onClick={onNavigate}
          className="line-clamp-2 font-medium hover:text-orange-600"
        >
          {item.brand} {item.name}
        </Link>
        <p className="text-xs text-zinc-500">
          {item.size ? `${item.size} · ` : ""}
          {formatPrice(item.price)} each
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label={`Decrease quantity of ${item.name}`}
            onClick={() => setQuantity(item.slug, item.quantity - 1)}
          >
            <Minus />
          </Button>
          <span className="w-6 text-center text-sm tabular-nums">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            aria-label={`Increase quantity of ${item.name}`}
            onClick={() => setQuantity(item.slug, item.quantity + 1)}
          >
            <Plus />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between">
        <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
        <Button
          variant="ghost"
          size="icon"
          aria-label={`Remove ${item.name}`}
          onClick={() => removeItem(item.slug)}
        >
          <Trash2 />
        </Button>
      </div>
    </li>
  );
}
