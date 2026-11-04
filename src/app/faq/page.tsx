"use client";

import { useState } from "react";
import Link from "next/link";
import { whatsappLink } from "@/lib/site";

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    category: "Products",
    question: "What's the difference between PET Color Change film and Self-Healing PPF?",
    answer:
      "PET Color Change film is designed to transform your vehicle's appearance with 700+ vibrant colors and finishes (gloss, matte, liquid metal, chameleon, holographic, etc.). It's about style and self-expression. Self-Healing Paint Protection Film (PPF) is an optically clear, durable film designed to protect your original paint from rock chips, scratches, and swirl marks — with a topcoat that self-repairs minor scratches using heat. Many customers use PPF on high-impact areas (hood, fenders, mirrors) and color change film on the rest of the vehicle.",
  },
  {
    category: "Products",
    question: "What finishes are available?",
    answer:
      "We offer over 14 finish types including: gloss, matte, ultra-matte, metallic, crystal, liquid metal, color-shift/chameleon, electroplated, holographic, ceramic, electro-gloss, diamond, and standard. Each finish interacts with light differently — from the mirror-like depth of electro-gloss to the shifting prismatic effects of holographic film.",
  },
  {
    category: "Installation",
    question: "How is the film installed? Can I do it myself?",
    answer:
      "While experienced DIYers can install our films, we strongly recommend professional installation for best results. Our films feature air-release adhesive channels that make bubble-free application easier, but a professional installer will ensure proper seam placement, stretch technique, and edge wrapping. Installation typically takes 1-2 days for a full vehicle wrap. We can recommend certified installers in many regions — just ask us on WhatsApp.",
  },
  {
    category: "Durability",
    question: "How long does the film last?",
    answer:
      "PET Color Change films are rated for 5-7 years of outdoor durability. Self-Healing PPF films are rated for 7-10 years. Actual lifespan depends on climate, maintenance, and sun exposure. All our films feature UV-resistant topcoats to prevent fading and yellowing. With proper care, your wrap will look vibrant for years.",
  },
  {
    category: "Warranty",
    question: "Do you offer a warranty?",
    answer:
      "Yes. All our films come with a manufacturer's warranty against peeling, cracking, fading, and yellowing. PET Color Change films carry a 5-year warranty. Self-Healing PPF films carry a 10-year warranty. Warranty coverage applies to manufacturing defects and does not cover damage from improper installation, accidents, or neglect. For wholesale orders, extended warranty terms are available.",
  },
  {
    category: "Shipping",
    question: "How long does shipping take?",
    answer:
      "Orders typically ship within 2-3 business days of payment confirmation. Shipping transit times vary by destination: 5-10 days to most of Asia, 7-14 days to North America and Europe, 10-21 days to Africa, South America, and Oceania. We provide tracking numbers for all shipments. For bulk/wholesale orders, consolidated freight options may extend lead times but significantly reduce per-unit shipping costs.",
  },
  {
    category: "Shipping",
    question: "Do you handle customs and import duties?",
    answer:
      "We handle all export documentation from our facility. For international orders, customs clearance and import duties are the responsibility of the buyer. However, we can advise on HS codes, provide commercial invoices, and assist with documentation to make the customs process smooth. For wholesale/container orders, we work with freight forwarders who can handle door-to-door delivery including customs clearance.",
  },
  {
    category: "Products",
    question: "Can you match a specific color I'm looking for?",
    answer:
      "Yes! We offer custom color matching services. If you have a specific color in mind — a Pantone reference, a sample swatch, or even a photo of a color you want — our R&D team can formulate a custom batch. Custom color matching requires a minimum order quantity (typically 10+ rolls). Contact us with your color requirements and we'll provide a quote and lead time.",
  },
  {
    category: "Orders",
    question: "What is the minimum order quantity?",
    answer:
      "For retail orders through our website, the minimum is 1 roll. For wholesale pricing, the minimum is 10 rolls (can be mixed colors and finishes within the same film category). For custom color matching and private label branding, minimums start at 50 rolls. There are no minimums for sample swatches — contact us for a color card.",
  },
  {
    category: "Care",
    question: "How do I care for my wrapped vehicle?",
    answer:
      "Proper care extends the life and appearance of your wrap: Wash by hand or use touchless car washes (avoid brush car washes). Use pH-neutral car wash soap — avoid harsh chemicals, solvents, or abrasive cleaners. Do not wax matte or ultra-matte finishes (use matte-specific detailing products). For gloss finishes, ceramic coatings can be applied after 30 days. Avoid pressure washing at close range near edges and seams. Park in shade when possible to reduce UV exposure.",
  },
  {
    category: "Installation",
    question: "Can the film be removed without damaging my paint?",
    answer:
      "Yes. Our films use removable adhesive systems designed to release cleanly when properly removed. Professional removal is recommended, especially for films that have been on the vehicle for several years. The adhesive softens with heat, allowing the film to peel off without leaving residue or damaging factory paint. Important: film should be removed from original/OEM paint. Aftermarket repaints may be more susceptible to damage during removal.",
  },
];

const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center lg:px-10 lg:py-20">
          <p className="eyebrow mb-4">
            <span className="text-vault">●</span> Help Center
          </p>
          <h1 className="display-xl text-silver-bright">
            Frequently Asked<br />
            <span className="text-vault">Questions</span>
          </h1>
          <p className="mt-4 text-sm text-silver">
            Everything you need to know about our films, installation, shipping,
            and care. Can&apos;t find your answer? Reach out on WhatsApp.
          </p>
        </div>
      </section>

      {/* ─── FAQ list ─── */}
      <section className="mx-auto max-w-3xl px-6 py-12 lg:px-10">
        {/* Category filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                activeCategory === cat
                  ? "border-vault bg-vault/10 text-vault"
                  : "border-ink-border bg-white text-silver-light hover:border-silver-light hover:text-silver-bright"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={`${faq.category}-${faq.question}`}
                className="card-dark overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-bold text-silver-bright sm:text-base">
                    {faq.question}
                  </span>
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-ink-border transition-all duration-300 ${
                      isOpen ? "rotate-45 border-vault text-vault" : "text-silver"
                    }`}
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-ink-border px-5 py-4">
                      <p className="text-sm leading-relaxed text-silver-light">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still have questions? */}
        <div className="mt-12 flex flex-col items-center gap-4 rounded-2xl border border-ink-border bg-white p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-vault/10">
            <svg className="h-7 w-7 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <div>
            <h2 className="font-display text-lg font-bold text-silver-bright">
              Still Have Questions?
            </h2>
            <p className="mt-1 text-sm text-silver">
              Our team is ready to help. Chat with us on WhatsApp for instant answers.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink("Hello WrapVault, I have a question about your wrap films.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal !py-2.5 text-[11px]"
            >
              Chat on WhatsApp
            </a>
            <Link href="/contact" className="btn-ghost !py-2.5 text-[11px]">
              Contact Page
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
