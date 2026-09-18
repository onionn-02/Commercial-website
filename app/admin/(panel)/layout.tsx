import type { Metadata } from "next";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/admin/actions";
import { requireAdmin } from "@/lib/supabase/admin";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: LayoutProps<"/admin">) {
  const { user } = await requireAdmin();

  return (
    <div className="flex flex-1 flex-col bg-zinc-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3">
          <div className="flex items-center gap-6">
            <span className="font-bold">{siteConfig.name} · Admin</span>
            <nav className="flex gap-4 text-sm font-medium">
              <Link href="/admin/products" className="hover:text-orange-600">
                Products
              </Link>
              <Link href="/admin/orders" className="hover:text-orange-600">
                Orders
              </Link>
              <Link href="/" className="text-zinc-500 hover:text-orange-600">
                View site
              </Link>
            </nav>
          </div>
          <form action={logout} className="flex items-center gap-2">
            <span className="hidden text-xs text-zinc-500 sm:inline">{user.email}</span>
            <Button type="submit" variant="outline">
              <LogOut /> Sign out
            </Button>
          </form>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-6">{children}</div>
    </div>
  );
}
