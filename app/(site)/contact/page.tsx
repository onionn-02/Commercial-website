import type { Metadata } from "next";
import { Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { fullAddress, siteConfig, telLink, whatsappLink } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(
    `${siteConfig.name}, ${fullAddress()}`,
  )}&output=embed`;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold">Contact us</h1>
      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <p className="flex gap-2">
            <MapPin className="mt-0.5 size-5 shrink-0 text-orange-600" /> {fullAddress()}
          </p>
          <p className="flex gap-2">
            <Clock className="mt-0.5 size-5 shrink-0 text-orange-600" />
            {siteConfig.hours.days}, {siteConfig.hours.open} – {siteConfig.hours.close}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={whatsappLink("Hi, I'd like to enquire about auto parts.")}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ size: "lg", className: "h-11 px-5 text-base" })}
            >
              <MessageCircle /> WhatsApp
            </a>
            <a
              href={telLink()}
              className={buttonVariants({ variant: "outline", size: "lg", className: "h-11 px-5 text-base" })}
            >
              <Phone /> Call now
            </a>
          </div>
        </div>
        <iframe
          title="Shop location"
          src={mapSrc}
          className="h-80 w-full rounded-xl border"
          loading="lazy"
        />
      </div>
    </div>
  );
}
