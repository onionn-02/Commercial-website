import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductImage } from "@/components/product/ProductImage";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function ProductCard({ product, priority }: { product: Product; priority?: boolean }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-white">
      <Link href={`/shop/${product.slug}`} className="flex flex-1 flex-col">
        <ProductImage
          src={product.imageUrl}
          alt={`${product.brand} ${product.name}`}
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          priority={priority}
          className="aspect-4/3"
        />
        <div className="flex-1 space-y-1 p-3">
          <p className="text-xs font-medium uppercase text-zinc-500">{product.brand}</p>
          <h2 className="line-clamp-2 font-semibold leading-snug">{product.name}</h2>
          {product.size && <p className="text-xs text-zinc-500">{product.size}</p>}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-lg font-bold">{formatPrice(product.price)}</span>
            {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
          </div>
        </div>
      </Link>
      <div className="p-3 pt-0">
        <AddToCartButton product={product} className="h-9 w-full" />
      </div>
    </div>
  );
}
