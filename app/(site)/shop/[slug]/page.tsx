import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { ProductImage } from "@/components/product/ProductImage";
import { getCategories, getProduct } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { JsonLd } from "@/components/shared/JsonLd";
import { siteConfig, siteUrl, whatsappLink } from "@/lib/site";

export async function generateMetadata({ params }: PageProps<"/shop/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return {};
  const title = `${product.brand} ${product.name}`;
  const description = `${product.description} Buy at ${siteConfig.name}, Hadapsar, Pune.`;
  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: { title, description, images: product.imageUrl ? [product.imageUrl] : undefined },
  };
}

export default async function ProductPage({ params }: PageProps<"/shop/[slug]">) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const category = (await getCategories()).find((c) => c.slug === product.category);
  const title = `${product.brand} ${product.name}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description: product.description,
    brand: { "@type": "Brand", name: product.brand },
    image: product.imageUrl,
    category: category?.name,
    url: `${siteUrl}/shop/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <JsonLd data={jsonLd} />
      <Link
        href={category ? `/shop?category=${category.slug}` : "/shop"}
        className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-orange-600"
      >
        <ChevronLeft className="size-4" /> {category?.name ?? "Shop"}
      </Link>

      <div className="mt-4 grid gap-8 md:grid-cols-2">
        <ProductImage
          src={product.imageUrl}
          alt={title}
          sizes="(min-width: 768px) 50vw, 100vw"
          priority
          className="aspect-square rounded-xl"
        />

        <div>
          <p className="text-sm font-medium uppercase text-zinc-500">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold md:text-3xl">{product.name}</h1>
          {product.size && <p className="mt-1 text-zinc-600">{product.size}</p>}

          <div className="mt-4 flex items-center gap-3">
            <span className="text-3xl font-bold">{formatPrice(product.price)}</span>
            {!product.inStock && <Badge variant="secondary">Out of stock</Badge>}
          </div>

          <p className="mt-4 text-zinc-700">{product.description}</p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <AddToCartButton product={product} className="h-11 px-5 text-base" />
            <a
              href={whatsappLink(`Hi, I'd like to enquire about ${title}${product.size ? ` (${product.size})` : ""}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5 text-base" })}
            >
              <MessageCircle /> Ask on WhatsApp
            </a>
          </div>

          <h2 className="mt-8 font-semibold">Specifications</h2>
          <dl className="mt-2 divide-y rounded-lg border">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 px-3 py-2 text-sm">
                <dt className="text-zinc-500">{s.label}</dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>

          {product.compatibleWith && (
            <>
              <h2 className="mt-6 font-semibold">Compatible vehicles</h2>
              <ul className="mt-2 flex flex-wrap gap-2">
                {product.compatibleWith.map((v) => (
                  <li key={v}>
                    <Badge variant="outline">{v}</Badge>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
