import { Clock, MapPin, Phone } from "lucide-react";
import { fullAddress, siteConfig, telLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-16 bg-zinc-900 text-zinc-300">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold text-white">{siteConfig.name}</h3>
          <p className="mt-2 text-sm">{siteConfig.tagline}</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="flex gap-2">
            <MapPin className="mt-0.5 size-4 shrink-0" /> {fullAddress()}
          </p>
          <p className="flex gap-2">
            <Clock className="mt-0.5 size-4 shrink-0" />
            {siteConfig.hours.days}, {siteConfig.hours.open} – {siteConfig.hours.close}
          </p>
          <p className="flex gap-2">
            <Phone className="mt-0.5 size-4 shrink-0" />
            <a href={telLink()}>+{siteConfig.phoneNumber.replace(/^91/, "91 ")}</a>
          </p>
        </div>
        <p className="text-sm md:text-right">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
