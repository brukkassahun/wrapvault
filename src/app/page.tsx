import Link from "next/link";
import { site, whatsappLink, trustBadges, filmCategories } from "@/lib/site";
import { getFeaturedProducts, getTotalProductCount, type Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export const revalidate = 3600; // Cache page for 1 hour

export default async function HomePage() {
  const [featuredProducts, totalCount] = await Promise.all([
    getFeaturedProducts(),
    getTotalProductCount(),
  ]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-ink-border">
        {/* Background gradient mesh */}
        <div className="absolute inset-0">
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-vault/10 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] rounded-full bg-flame/5 blur-[100px]" />
        </div>

        {/* Grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 lg:px-10 lg:pb-28 lg:pt-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Copy */}
            <div>
              <div className="eyebrow mb-6">
                <span className="text-vault">●</span> Factory Direct · 700+ Colors
              </div>

              <h1 className="display-xl text-silver-bright">
                Wrap Your Ride<br />
                <span className="text-vault">In Absolute</span><br />
                Perfection
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-silver">
                Premium PET color-change and self-healing paint protection films,
                manufactured in our ISO-certified facility and shipped worldwide.
                Electro-gloss, liquid metal, chameleon, holographic — {totalCount > 0 ? `${totalCount}+` : "726+"} colors
                ready to transform any vehicle.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/products" className="btn-primary">
                  Browse All Films
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <Link href="/wholesale" className="btn-ghost">
                  Wholesale Pricing
                </Link>
              </div>

              {/* Quick highlights */}
              <div className="mt-10 flex flex-wrap gap-4">
                {["Electro-Gloss", "Liquid Metal", "Chameleon", "Holographic", "Matte", "Crystal"].map(
                  (finish) => (
                    <span
                      key={finish}
                      className="rounded-full border border-ink-border bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-silver-light"
                    >
                      {finish}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right: Visual */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square">
                {/* Hexagonal frame */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative h-[85%] w-[85%]">
                    {/* Glow layers */}
                    <div className="absolute inset-0 rounded-full bg-vault/20 blur-3xl" />
                    <div className="absolute inset-8 rounded-full bg-gradient-to-br from-vault/10 via-transparent to-flame/10 blur-2xl" />

                    {/* Central card */}
                    <div className="absolute inset-12 flex items-center justify-center rounded-3xl border border-ink-border bg-white/80 backdrop-blur-sm">
                      <div className="text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-vault/10">
                          <svg className="h-10 w-10 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16V6a1 1 0 00-1-1H4a2 2 0 00-2 2v11a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1" />
                          </svg>
                        </div>
                        <p className="font-display text-4xl font-black text-vault">
                          {totalCount > 0 ? `${totalCount}+` : "726+"}
                        </p>
                        <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-silver">
                          Colors Available
                        </p>
                      </div>
                    </div>

                    {/* Orbiting badges */}
                    {[
                      { label: "PET", angle: 0 },
                      { label: "PPF", angle: 72 },
                      { label: "ISO", angle: 144 },
                      { label: "IATF", angle: 216 },
                      { label: "Global", angle: 288 },
                    ].map((badge, i) => {
                      const radius = 42;
                      const x = Math.cos((badge.angle * Math.PI) / 180) * radius;
                      const y = Math.sin((badge.angle * Math.PI) / 180) * radius;
                      return (
                        <div
                          key={badge.label}
                          className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                          style={{
                            transform: `translate(calc(-50% + ${x}%), calc(-50% + ${y}%))`,
                          }}
                        >
                          <span className="rounded-full border border-ink-border bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-vault shadow-lg shadow-black/10">
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS BAR
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { stat: totalCount > 0 ? `${totalCount}+` : "726+", label: "Colors Available", icon: "🎨" },
              { stat: "3", label: "Film Categories", icon: "🎬" },
              { stat: "150+", label: "Countries Shipped", icon: "🌍" },
              { stat: "ISO 9001", label: "Certified Quality", icon: "✅" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="font-display text-3xl font-black text-vault sm:text-4xl">
                  {item.stat}
                </p>
                <p className="mt-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-silver">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TRUST BADGES
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {trustBadges.map((badge, i) => (
              <Reveal key={badge.title} delay={i * 0.1}>
                <div className="card-dark flex items-start gap-4 p-6 hover:border-vault/30">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-vault/10">
                    {badge.icon === "factory" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 21V10l6-4v4l6-4v4l6-4v11H3z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21v-4M11 21v-4M15 21v-4M19 21v-4" />
                      </svg>
                    )}
                    {badge.icon === "shield" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-2-8l-7 3v6c0 5 3 9 7 10 4-1 7-5 7-10V6l-7-3z" />
                      </svg>
                    )}
                    {badge.icon === "globe" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 00-0 20" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                      {badge.title}
                    </h3>
                    <p className="mt-1 text-sm text-silver">{badge.sub}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          FEATURED PRODUCTS
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3">
                <span className="text-flare">●</span> Featured Selection
              </p>
              <h2 className="display-lg text-silver-bright">
                Signature Colors
              </h2>
              <p className="mt-2 max-w-md text-sm text-silver">
                Hand-picked bestsellers from our most popular finishes —
                ready to ship, factory-direct priced.
              </p>
            </div>
            <Link
              href="/products"
              className="btn-ghost !py-2.5 text-[11px]"
            >
              View All Films →
            </Link>
          </div>

          {featuredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {featuredProducts.map((product, i) => (
                <Reveal key={product.id} delay={(i % 4) * 0.08}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="card-dark flex flex-col items-center justify-center gap-4 py-16 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-vault/10">
                <svg className="h-8 w-8 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-silver-bright">
                  New Colors Coming Soon
                </h3>
                <p className="mt-1 max-w-sm text-sm text-silver">
                  We&apos;re loading the vault with 700+ premium wrap colors.
                  Be the first to know when they drop.
                </p>
              </div>
              <Link href="/contact" className="btn-primary !py-2.5 text-[11px]">
                Get Notified
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CATEGORY SHOWCASE
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> Two Technologies, Infinite Style
            </p>
            <h2 className="display-lg text-silver-bright">Choose Your Film Type</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* PET Color Change */}
            <Reveal>
              <Link
                href="/products?category=pet-color-change"
                className="card-dark group relative block overflow-hidden p-8 hover:border-vault/40"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-vault/10 blur-3xl transition-all duration-500 group-hover:bg-vault/20" />
                <div className="relative">
                  <span className="badge badge-featured mb-4">Color Change</span>
                  <h3 className="display-md text-silver-bright">
                    PET Color<br />Change Film
                  </h3>
                  <p className="mt-3 text-sm text-silver">
                    700+ vibrant colors with stunning finishes — electro-gloss,
                    liquid metal, chameleon, holographic, matte, crystal and more.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-vault">
                    Explore Colors →
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* Self-Healing */}
            <Reveal delay={0.1}>
              <Link
                href="/products?category=self-healing"
                className="card-dark group relative block overflow-hidden p-8 hover:border-signal/40"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-signal/10 blur-3xl transition-all duration-500 group-hover:bg-signal/20" />
                <div className="relative">
                  <span className="badge badge-available mb-4">Self-Healing</span>
                  <h3 className="display-md text-silver-bright">
                    Self-Healing<br />Wrap Film
                  </h3>
                  <p className="mt-3 text-sm text-silver">
                    Advanced wrap film with self-repairing topcoat.
                    Scratches and swirl marks disappear with heat.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-signal">
                    Explore →
                  </span>
                </div>
              </Link>
            </Reveal>

            {/* PPF */}
            <Reveal delay={0.2}>
              <Link
                href="/products?category=ppf"
                className="card-dark group relative block overflow-hidden p-8 hover:border-flame/40"
              >
                <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-flame/10 blur-3xl transition-all duration-500 group-hover:bg-flame/20" />
                <div className="relative">
                  <span className="badge badge-sold mb-4">PPF</span>
                  <h3 className="display-md text-silver-bright">
                    Paint Protection<br />Film (TPU)
                  </h3>
                  <p className="mt-3 text-sm text-silver">
                    Genuine TPU-based PPF — 6.5, 7.5 & 8.5 mil thicknesses.
                    Rock-chip protection, self-healing, optically clear.
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wider text-flame">
                    Explore PPF →
                  </span>
                </div>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          TECHNOLOGY HIGHLIGHTS
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> Engineered to Last
            </p>
            <h2 className="display-lg text-silver-bright">
              The Technology Behind the Color
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* 6-Layer Structure */}
            <Reveal>
              <div className="card-dark p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-vault/10">
                    <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18M3 18h18" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M12 4v16M17 4v16" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">Structure</p>
                    <h3 className="font-display text-base font-bold text-silver-bright">6-Layer Construction</h3>
                  </div>
                </div>
                <p className="text-sm text-silver">
                  Every film roll is built with six precision-engineered layers:
                  release liner, adhesive, base film, color layer, protective coat,
                  and UV-resistant topcoat — for depth, durability, and brilliance
                  that lasts.
                </p>
              </div>
            </Reveal>

            {/* Self-Healing Coating */}
            <Reveal delay={0.1}>
              <div className="card-dark p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10">
                    <svg className="h-6 w-6 text-signal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">Topcoat</p>
                    <h3 className="font-display text-base font-bold text-silver-bright">Self-Healing Coating</h3>
                  </div>
                </div>
                <p className="text-sm text-silver">
                  Our elastomeric topcoat uses thermodynamic memory — surface
                  scratches and micro-swirls naturally repair with sunlight or
                  warm water. Your wrap stays showroom-fresh for years.
                </p>
              </div>
            </Reveal>

            {/* ISO 9001 */}
            <Reveal delay={0.2}>
              <div className="card-dark p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-flare/10">
                    <svg className="h-6 w-6 text-flare" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-2-8l-7 3v6c0 5 3 9 7 10 4-1 7-5 7-10V6l-7-3z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-silver">Quality</p>
                    <h3 className="font-display text-base font-bold text-silver-bright">ISO 9001 Certified</h3>
                  </div>
                </div>
                <p className="text-sm text-silver">
                  Every batch is produced under ISO 9001 and IATF 16949 quality
                  systems in a Class 10K cleanroom environment. Four automated
                  coating lines ensure consistency across all 700+ colors.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA SECTION
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-ink-border bg-white">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vault/5 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-28">
          <p className="eyebrow mb-4">
            <span className="text-signal">●</span> Ready to Transform
          </p>
          <h2 className="display-xl text-silver-bright">
            Let&apos;s Find Your<br />
            <span className="text-vault">Perfect Color</span>
          </h2>
          <p className="mt-4 text-base text-silver">
            Chat with our team on WhatsApp for color recommendations, bulk pricing,
            or custom color matching. We respond in minutes during business hours.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href={whatsappLink(`Hello WrapVault, I'd like to find the perfect wrap color for my vehicle. Can you help?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </a>
            <Link href="/products" className="btn-ghost">
              Browse the Catalog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
