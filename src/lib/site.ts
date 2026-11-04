export const site = {
  name: "WrapVault",
  tagline: "Premium Car Wrap & PPF Films",
  description:
    "700+ colors in PET color-change and self-healing wrap films. Factory-direct pricing, global shipping. Electro-gloss, liquid metal, chameleon, holographic, matte, crystal and more.",
  phone: process.env.WHATSAPP_NUMBER || "8615365806070",
  whatsapp: process.env.WHATSAPP_NUMBER || "8615365806070",
  wechat: process.env.WECHAT_ID || "WRAPVAULT",
  email: process.env.CONTACT_EMAIL || "contact@wrapvault.com",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://wrapvault.com",
  address: "China",
  currency: "USD" as const,
  exchangeRate: 7.2, // CNY to USD
};

export const navLinks = [
  { href: "/products", label: "Shop Films" },
  { href: "/products?category=pet-color-change", label: "Color Change" },
  { href: "/products?category=self-healing", label: "Self-Healing" },
  { href: "/wholesale", label: "Wholesale" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Film categories
export const filmCategories = [
  { id: "pet-color-change", name: "PET Color Change Film", tagline: "700+ colors, factory-direct" },
  { id: "self-healing", name: "Self-Healing Wrap Film", tagline: "Scratch-repair technology" },
] as const;

// Finish types for filtering
export const finishTypes = [
  "gloss", "matte", "metallic", "crystal", "liquid-metal",
  "color-shift", "ultra-matte", "electroplated", "chameleon",
  "holographic", "ceramic", "electro-gloss", "diamond", "standard",
] as const;

// Color families for filtering
export const colorFamilies = [
  "black", "white", "grey", "silver", "red", "blue", "green",
  "yellow", "purple", "pink", "orange", "gold", "brown", "multi",
] as const;

// Trust badges
export const trustBadges = [
  { icon: "factory", title: "Factory Direct", sub: "No middlemen — buy direct from the manufacturer" },
  { icon: "shield", title: "ISO 9001 Certified", sub: "IATF 16949 automotive-grade quality system" },
  { icon: "globe", title: "Global Shipping", sub: "Worldwide delivery, consolidated freight" },
] as const;

export const currencies = [
  { code: "USD", symbol: "$", rate: 1, label: "US Dollar" },
  { code: "CNY", symbol: "¥", rate: 7.2, label: "Chinese Yuan" },
  { code: "EUR", symbol: "€", rate: 0.92, label: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.79, label: "British Pound" },
  { code: "NGN", symbol: "₦", rate: 1485, label: "Nigerian Naira" },
  { code: "GHS", symbol: "₵", rate: 12.5, label: "Ghanaian Cedi" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

export function cnyToUsd(cny: number): number {
  return Math.round(cny / site.exchangeRate);
}

export function formatPrice(cny: number, currencyCode: CurrencyCode = "USD"): string {
  const usd = cnyToUsd(cny);
  const currency = currencies.find(c => c.code === currencyCode);
  if (!currency) return `$${usd.toLocaleString()}`;
  const converted = Math.round(usd * currency.rate);
  return `${currency.symbol}${converted.toLocaleString()}`;
}
