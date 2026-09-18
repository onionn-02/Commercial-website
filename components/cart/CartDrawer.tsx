"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { CartItemRow } from "@/components/cart/CartItemRow";
import { CartSummary } from "@/components/cart/CartSummary";
import { useCart } from "@/hooks/useCart";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, count } = useCart();

  return (
    <>
      <Button
        variant="outline"
        size="lg"
        aria-label={`Open cart, ${count} items`}
        onClick={() => setOpen(true)}
        className="relative"
      >
        <ShoppingCart />
        {count > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-orange-700 text-xs font-bold text-white">
            {count}
          </span>
        )}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full p-4 sm:max-w-md">
          <SheetHeader className="p-0">
            <SheetTitle>Your cart</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center text-zinc-600">
              <p>Your cart is empty.</p>
              <Link
                href="/shop"
                onClick={() => setOpen(false)}
                className={buttonVariants({ size: "lg" })}
              >
                Browse products
              </Link>
            </div>
          ) : (
            <>
              <ul className="flex-1 overflow-y-auto">
                {items.map((item) => (
                  <CartItemRow key={item.slug} item={item} onNavigate={() => setOpen(false)} />
                ))}
              </ul>
              <CartSummary />
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
