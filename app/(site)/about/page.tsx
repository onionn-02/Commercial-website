import type { Metadata } from "next";
import { fullAddress, siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold">About {siteConfig.name}</h1>
      <p className="mt-4 text-zinc-700">
        {siteConfig.name} is a local auto parts shop in Hadapsar, Pune, serving
        two-wheeler and four-wheeler owners with engine oils, brake shoes,
        filters, batteries and other spare parts.
      </p>
      <p className="mt-4 text-zinc-700">
        {/* TODO: replace with the real shop story (years in business, brands, etc.) */}
        Tell us the part you need and we&apos;ll help you find the right fit.
      </p>
      <p className="mt-6 text-sm text-zinc-500">{fullAddress()}</p>
    </div>
  );
}
