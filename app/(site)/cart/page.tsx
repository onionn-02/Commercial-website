"use client";

import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export default function CartPage() {
  const { items, clear } = useCart();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your cart</h1>
        {items.length > 0 && (
          <Button variant="ghost" onClick={clear}>
            Clear cart
          </Button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="py-16 text-center text-zinc-600">
          <p>Your cart is empty.</p>
          <Link href="/shop" className={buttonVariants({ size: "lg", className: "mt-4 h-11 px-5 text-base" })}>
            Browse products
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-4">
            {items.map((item) => (
              <CartItemRow key={item.slug} item={item} />
            ))}
          </ul>
          <div className="mt-6">
            <CartSummary />
          </div>
        </>
      )}
    </div>
  );
}
