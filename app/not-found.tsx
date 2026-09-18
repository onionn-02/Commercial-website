import Link from "next/link";
import { SiteChrome } from "@/components/layout/SiteChrome";
import { buttonVariants } from "@/components/ui/button";

// Global 404. Rendered outside the (site) layout, so it brings its own storefront chrome.
export default function NotFound() {
  return (
    <SiteChrome>
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-orange-700">404</p>
        <h1 className="mt-2 text-2xl font-bold">Page not found</h1>
        <p className="mt-2 text-zinc-600">This page doesn&apos;t exist or the product is no longer listed.</p>
        <Link href="/shop" className={buttonVariants({ size: "lg", className: "mt-6 h-11 px-5 text-base" })}>
          Browse the shop
        </Link>
      </div>
    </SiteChrome>
  );
}
