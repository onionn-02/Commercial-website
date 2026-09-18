export type Category = {
  slug: string;
  name: string;
};

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: string; // Category slug
  price: number; // INR, per unit
  size?: string; // e.g. "1 L", "Set of 2"
  description: string;
  specs: { label: string; value: string }[];
  compatibleWith?: string[];
  inStock: boolean;
  imageUrl?: string;
};

// The cart is client-side and can't query the DB, so each line keeps a snapshot of what it needs.
export type CartProduct = Pick<Product, "slug" | "name" | "brand" | "size" | "price" | "imageUrl">;

export type CartItem = CartProduct & { quantity: number };
