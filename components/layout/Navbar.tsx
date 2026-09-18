import Link from "next/link";
import { Phone, Wrench } from "lucide-react";
import { siteConfig, telLink } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { CartDrawer } from "@/components/cart/CartDrawer";

const links = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-9 items-center justify-center rounded-lg bg-orange-600 text-white">
            <Wrench className="size-5" />
          </span>
          <span className="leading-tight">{siteConfig.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-orange-600">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CartDrawer />
          <a href={telLink()} className={buttonVariants({ size: "lg" })}>
            <Phone /> Call
          </a>
        </div>
      </div>

      {/* Mobile nav: simple scrollable row, no JS needed */}
      <nav className="flex gap-5 overflow-x-auto border-t px-4 py-2 text-sm font-medium md:hidden">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="whitespace-nowrap">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
