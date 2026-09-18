import Link from "next/link";
import { Clock, MapPin, MessageCircle, ShieldCheck, Truck, Wrench } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { fullAddress, siteConfig, whatsappLink } from "@/lib/site";

const categories = [
  "Engine Oils",
  "Brake Shoes & Pads",
  "Filters",
  "Batteries",
  "Spark Plugs",
  "Chains & Sprockets",
  "Lubricants & Greases",
  "Spare Parts & Accessories",
];

export default function Home() {
  return (
    <>
      <section className="bg-zinc-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
            Hadapsar, Pune
          </p>
          <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-zinc-300">
            Genuine engine oils, brake shoes and spare parts for your vehicle.
            Message us on WhatsApp and we&apos;ll get it ready.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink("Hi, I'd like to order some auto parts.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", className: "h-11 px-5 text-base" })}
            >
              <MessageCircle /> Order on WhatsApp
            </a>
            <Link
              href="/shop"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-11 px-5 text-base text-zinc-900",
              })}
            >
              Browse products
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl font-bold">What we stock</h2>
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map((c) => (
            <Link
              key={c}
              href="/shop"
              className="flex items-center gap-2 rounded-xl border p-4 font-medium hover:border-orange-500 hover:text-orange-600"
            >
              <Wrench className="size-4 shrink-0" /> {c}
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-4 px-4 md:grid-cols-3">
        {[
          { icon: ShieldCheck, title: "Genuine parts", text: "Trusted brands at fair prices." },
          { icon: MessageCircle, title: "Order on WhatsApp", text: "No sign-up. Send your list and we confirm." },
          { icon: Truck, title: "Quick pickup", text: "Ready when you reach the shop." },
        ].map(({ icon: Icon, title, text }) => (
          <div key={title} className="rounded-xl bg-zinc-50 p-5">
            <Icon className="size-6 text-orange-600" />
            <h3 className="mt-3 font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{text}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto mt-12 max-w-6xl px-4">
        <div className="rounded-xl border p-6">
          <h2 className="text-xl font-bold">Visit the shop</h2>
          <p className="mt-3 flex gap-2 text-zinc-700">
            <MapPin className="mt-0.5 size-5 shrink-0" /> {fullAddress()}
          </p>
          <p className="mt-2 flex gap-2 text-zinc-700">
            <Clock className="mt-0.5 size-5 shrink-0" />
            {siteConfig.hours.days}, {siteConfig.hours.open} – {siteConfig.hours.close}
          </p>
        </div>
      </section>
    </>
  );
}
