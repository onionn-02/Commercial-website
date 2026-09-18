import { SiteChrome } from "@/components/layout/SiteChrome";
import { JsonLd } from "@/components/shared/JsonLd";
import { fullAddress, siteConfig, siteUrl } from "@/lib/site";

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "AutoPartsStore",
  name: siteConfig.name,
  description: siteConfig.tagline,
  url: siteUrl,
  telephone: `+${siteConfig.phoneNumber}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${siteConfig.address.line1}, ${siteConfig.address.line2}`,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.pincode,
    addressCountry: "IN",
  },
  // Keep in sync with siteConfig.hours (open all days, 10 AM - 7 PM).
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "10:00",
    closes: "19:00",
  },
  areaServed: "Hadapsar, Pune",
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress())}`,
};

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <SiteChrome>
      <JsonLd data={localBusiness} />
      {children}
    </SiteChrome>
  );
}
