// Single source of truth for business details. Update here and every page follows.
export const siteConfig = {
  name: "Ganesh Auto Break Liners",
  tagline: "Engine oils, brake shoes & auto spare parts",
  address: {
    line1: "Shop No. 9, Amar Palace",
    line2: "Near Janseva Sahakari Bank, Hadapsar",
    city: "Pune",
    pincode: "411028",
    state: "Maharashtra",
  },
  // WhatsApp/phone in international format without "+" or spaces
  whatsappNumber: "919763676700",
  phoneNumber: "919763676700",
  hours: {
    open: "10:00 AM",
    close: "7:00 PM",
    days: "Open all days",
  },
} as const;

export const fullAddress = () => {
  const a = siteConfig.address;
  return `${a.line1}, ${a.line2}, ${a.city} ${a.pincode}`;
};

export const whatsappLink = (message: string) =>
  `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const telLink = () => `tel:+${siteConfig.phoneNumber}`;

// Public origin for canonical URLs, sitemap and structured data. Set NEXT_PUBLIC_SITE_URL once the real domain exists.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
