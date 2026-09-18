"use client";

import { createContext, useCallback, useMemo, useSyncExternalStore } from "react";
import type { CartItem, CartProduct } from "@/lib/types";

const STORAGE_KEY = "cart-v2"; // v2: items carry a product snapshot
const EMPTY: CartItem[] = [];

// Tiny external store so the cart lives in localStorage without effect-driven hydration.
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedItems: CartItem[] = EMPTY;

function read(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedRaw) return cachedItems;
    cachedRaw = raw;
    const parsed = raw ? JSON.parse(raw) : [];
    cachedItems = Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    cachedItems = EMPTY;
  }
  return cachedItems;
}

function write(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    // Storage unavailable (private mode / full): cart just won't persist.
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb); // keep other tabs in sync
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (product: CartProduct, quantity?: number) => void;
  setQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clear: () => void;
};

export const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, read, () => EMPTY);

  const addItem = useCallback((product: CartProduct, quantity = 1) => {
    const current = read();
    const existing = current.find((i) => i.slug === product.slug);
    write(
      existing
        ? // Refresh the snapshot too, so re-adding picks up a changed price.
          current.map((i) =>
            i.slug === product.slug ? { ...i, ...product, quantity: i.quantity + quantity } : i,
          )
        : [...current, { ...product, quantity }],
    );
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    const current = read();
    write(
      quantity <= 0
        ? current.filter((i) => i.slug !== slug)
        : current.map((i) => (i.slug === slug ? { ...i, quantity } : i)),
    );
  }, []);

  const removeItem = useCallback((slug: string) => {
    write(read().filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      addItem,
      setQuantity,
      removeItem,
      clear,
    }),
    [items, addItem, setQuantity, removeItem, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
