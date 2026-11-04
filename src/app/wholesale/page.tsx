import Link from "next/link";
import { whatsappLink } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Wholesale & Bulk Orders",
  description:
    "Volume pricing on car wrap and PPF films. Custom branding, color card customization, consolidated shipping. Minimum 10 rolls. Factory-direct wholesale rates.",
};

export default function WholesalePage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-ink-border">
        <div className="absolute inset-0">
          <div className="absolute left-1/3 top-0 h-[400px] w-[400px] rounded-full bg-vault/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">
              <span className="text-vault">●</span> Wholesale & Bulk
            </p>
            <h1 className="display-xl text-silver-bright">
              Scale Your Wrap<br />
              <span className="text-vault">Business</span> with Us
            </h1>
            <p className="mt-6 text-base leading-relaxed text-silver">
              Whether you&apos;re a wrap shop, distributor, or dealership chain,
              we offer the pricing, branding, and logistics support you need to
              grow. Order 10 rolls or 10,000 — same factory-direct quality,
              scaled to your volume.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Hello WrapVault, I'd like to discuss wholesale pricing and bulk orders.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-signal"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Discuss on WhatsApp
              </a>
              <Link href="#inquiry" className="btn-ghost">
                Submit Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          BENEFITS
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> Wholesale Benefits
            </p>
            <h2 className="display-lg text-silver-bright">Why Buy Bulk from WrapVault?</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Volume Pricing",
                icon: "tag",
                desc: "Tiered discounts starting at 10 rolls. The more you order, the better the rate. Custom quotes available for container loads.",
                highlight: "From 10 rolls",
              },
              {
                title: "Custom Branding",
                icon: "sparkle",
                desc: "White-label packaging with your logo, brand colors, and marketing materials. Build your own wrap film brand without owning a factory.",
                highlight: "Your brand",
              },
              {
                title: "Consolidated Shipping",
                icon: "truck",
                desc: "We handle freight logistics, customs documentation, and consolidated shipping to reduce per-unit costs. Door-to-door or port-to-port.",
                highlight: "Global freight",
              },
              {
                title: "Color Card Customization",
                icon: "palette",
                desc: "Create a custom color card or swatch book with your selected finishes. Perfect for showrooms and customer presentations.",
                highlight: "Custom swatch books",
              },
            ].map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="card-dark h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-vault/10">
                    {benefit.icon === "tag" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                    )}
                    {benefit.icon === "sparkle" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                    {benefit.icon === "truck" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a2 2 0 00-2 2v11a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8h4l3 4v4a1 1 0 01-1 1h-2m-4-1a1 1 0 001-1" />
                      </svg>
                    )}
                    {benefit.icon === "palette" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    )}
                  </div>
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-vault">
                    {benefit.highlight}
                  </p>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-silver">
                    {benefit.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          PROCESS
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> How It Works
            </p>
            <h2 className="display-lg text-silver-bright">The Wholesale Process</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "Submit Inquiry",
                desc: "Fill out the form below or message us on WhatsApp with your requirements: product types, quantities, target colors, and destination country.",
              },
              {
                step: "02",
                title: "Receive Quote",
                desc: "Within 24 hours, you'll receive a detailed quote with tiered pricing, shipping options, and estimated lead times. Custom branding options included.",
              },
              {
                step: "03",
                title: "Confirm & Produce",
                desc: "Approve the quote and we begin production or allocate stock. Custom branding and color card orders enter our production queue immediately.",
              },
              {
                step: "04",
                title: "Ship & Deliver",
                desc: "We handle export documentation, consolidated freight, and tracking. Your order arrives at your port or doorstep — insured and documented.",
              },
            ].map((item, i) => (
              <Reveal key={item.step} delay={i * 0.1}>
                <div className="relative">
                  {/* Step number */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="font-display text-5xl font-black text-ink-border">
                      {item.step}
                    </span>
                    <div className="h-px flex-1 bg-ink-border" />
                  </div>
                  <h3 className="font-display text-base font-bold uppercase tracking-wider text-silver-bright">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-silver">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          INQUIRY FORM
          ════════════════════════════════════════════════════════════ */}
      <section id="inquiry" className="border-b border-ink-border">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> Start Your Wholesale Journey
            </p>
            <h2 className="display-lg text-silver-bright">Request a Wholesale Quote</h2>
            <p className="mt-2 text-sm text-silver">
              Tell us about your business and what you need. We&apos;ll send a
              detailed quote within 24 hours.
            </p>
          </div>

          <div className="card-dark p-6 lg:p-8">
            <ContactForm inquiryType="wholesale" showProductField />
          </div>

          {/* WhatsApp alternative */}
          <div className="mt-6 flex flex-col items-center gap-3 rounded-xl border border-ink-border bg-white p-6 text-center">
            <p className="text-sm text-silver">
              Prefer to talk directly? Our wholesale team is on WhatsApp.
            </p>
            <a
              href={whatsappLink("Hello WrapVault, I'd like to discuss wholesale pricing and bulk orders.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal !py-2.5 text-[11px]"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat with Wholesale Team
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
