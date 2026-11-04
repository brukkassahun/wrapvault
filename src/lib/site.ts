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
  currency: "CNY" as const,
  exchangeRate: 7.2, // CNY to USD (for reference only — prices displayed in RMB)
  rollLength: "15.5m per roll",
};

export const navLinks = [
  { href: "/products", label: "Shop Films" },
  { href: "/products?category=pet-color-change", label: "Color Change" },
  { href: "/products?category=self-healing", label: "Self-Healing" },
  { href: "/products?category=ppf", label: "PPF" },
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
  { id: "ppf", name: "Paint Protection Film (TPU)", tagline: "True PPF — rock-chip protection" },
] as const;

// Finish types for filtering
export const finishTypes = [
  "gloss", "matte", "metallic", "crystal", "liquid-metal",
  "color-shift", "ultra-matte", "electroplated", "chameleon",
  "holographic", "ceramic", "electro-gloss", "diamond", "standard", "tpu",
] as const;

// Color families for filtering
export const colorFamilies = [
  "black", "white", "grey", "silver", "red", "blue", "green",
  "yellow", "purple", "pink", "orange", "gold", "brown", "multi", "clear",
] as const;

// Trust badges
export const trustBadges = [
  { icon: "factory", title: "Factory Direct", sub: "No middlemen — buy direct from the manufacturer" },
  { icon: "shield", title: "ISO 9001 Certified", sub: "IATF 16949 automotive-grade quality system" },
  { icon: "globe", title: "Global Shipping", sub: "Worldwide delivery, consolidated freight" },
] as const;

// Currencies — CNY (RMB) is the primary display currency
export const currencies = [
  { code: "CNY", symbol: "¥", rate: 1, label: "Chinese Yuan (RMB)" },
  { code: "USD", symbol: "$", rate: 0.139, label: "US Dollar" },
  { code: "EUR", symbol: "€", rate: 0.128, label: "Euro" },
  { code: "GBP", symbol: "£", rate: 0.110, label: "British Pound" },
  { code: "NGN", symbol: "₦", rate: 206, label: "Nigerian Naira" },
  { code: "GHS", symbol: "₵", rate: 1.74, label: "Ghanaian Cedi" },
] as const;

export type CurrencyCode = (typeof currencies)[number]["code"];

/**
 * Format price — prices are stored in CNY (RMB).
 * Default display is RMB. Other currencies convert from CNY directly.
 */
export function formatPrice(cny: number, currencyCode: CurrencyCode = "CNY"): string {
  const currency = currencies.find((c) => c.code === currencyCode);
  if (!currency) return `¥${cny.toLocaleString()}`;
  const converted = Math.round(cny * currency.rate);
  return `${currency.symbol}${converted.toLocaleString()}`;
}

/** Per-roll price label helper */
export function priceLabel(cny: number, currencyCode: CurrencyCode = "CNY"): string {
  return `${formatPrice(cny, currencyCode)} / roll (15.5m)`;
}
