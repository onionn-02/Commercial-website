import Link from "next/link";
import { MessageCircle, SearchX } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { ProductCard } from "@/components/product/ProductCard";
import { whatsappLink } from "@/lib/site";
import type { Product } from "@/lib/types";

export function ProductGrid({ products, filtered }: { products: Product[]; filtered: boolean }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-zinc-600">
        <SearchX className="size-10 text-zinc-300" />
        <p className="font-medium text-zinc-800">
          {filtered ? "No products match your search." : "No products here yet."}
        </p>
        <p className="max-w-sm text-sm">
          Can&apos;t find your part? Message us, we may have it in the shop even if it isn&apos;t listed.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {filtered && (
            <Link href="/shop" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Clear filters
            </Link>
          )}
          <a
            href={whatsappLink("Hi, I'm looking for an auto part.")}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ size: "lg" })}
          >
            <MessageCircle /> Ask on WhatsApp
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
      {products.map((p, i) => (
        <ProductCard key={p.slug} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
