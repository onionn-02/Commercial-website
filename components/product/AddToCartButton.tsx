"use client";

import { useState } from "react";
import { Check, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product, className }: { product: Product; className?: string }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!product.inStock) {
    return (
      <Button size="lg" disabled className={className}>
        Out of stock
      </Button>
    );
  }

  return (
    <Button
      size="lg"
      className={className}
      onClick={() => {
        const { slug, name, brand, size, price, imageUrl } = product;
        addItem({ slug, name, brand, size, price, imageUrl });
        setAdded(true);
        setTimeout(() => setAdded(false), 1200);
      }}
    >
      {added ? <Check /> : <ShoppingCart />}
      {added ? "Added" : "Add to cart"}
    </Button>
  );
}
