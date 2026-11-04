import Link from "next/link";
import { whatsappLink, site } from "@/lib/site";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About WrapVault",
  description:
    "Factory-direct car wrap and PPF films. 100,000m² production facility, 15+ years of experience, ISO 9001 & IATF 16949 certified. 700+ colors shipped worldwide.",
};

export default function AboutPage() {
  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          HERO
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden border-b border-ink-border">
        {/* Background glow */}
        <div className="absolute inset-0">
          <div className="absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-vault/8 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow mb-6">
              <span className="text-vault">●</span> Our Story
            </p>
            <h1 className="display-xl text-silver-bright">
              Built by People<br />
              <span className="text-vault">Obsessed</span> with Color
            </h1>
            <p className="mt-6 text-base leading-relaxed text-silver">
              WrapVault exists for one reason: to give the world access to
              factory-direct, automotive-grade wrap films without the middleman
              markup. We manufacture, we quality-check, we ship — straight from
              our production lines to your doorstep, anywhere on the planet.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">
                Explore Our Films
              </Link>
              <Link href="/wholesale" className="btn-ghost">
                Wholesale Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STORY
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left: Story copy */}
            <Reveal>
              <div>
                <p className="eyebrow mb-4">
                  <span className="text-vault">●</span> Factory Direct
                </p>
                <h2 className="display-lg text-silver-bright">
                  From Production Line<br />to Your Driveway
                </h2>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-silver-light">
                  <p>
                    For over 15 years, our team has been at the forefront of
                    automotive film manufacturing. What started as a small
                    coating operation has grown into a 100,000m² production
                    facility with four fully automated coating lines and a
                    Class 10K cleanroom — the kind of precision environment
                    where aerospace components are built.
                  </p>
                  <p>
                    We didn&apos;t get here by cutting corners. Every roll of
                    film that leaves our facility has been produced under
                    ISO 9001 and IATF 16949 quality management systems, tested
                    for color consistency, adhesion strength, and outdoor
                    durability. That&apos;s why we confidently offer 700+ colors
                    across two distinct film technologies.
                  </p>
                  <p>
                    WrapVault is our direct-to-market brand — no distributors,
                    no importers, no retail markups. You buy from the people
                    who make the film. That means better pricing, deeper stock,
                    and direct technical support from the engineers who designed
                    the product.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right: Facility highlights */}
            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { stat: "100,000m²", label: "Production Facility", desc: "Purpose-built manufacturing campus" },
                  { stat: "15+", label: "Years Experience", desc: "Decades of coating expertise" },
                  { stat: "4", label: "Automated Lines", desc: "Continuous high-volume production" },
                  { stat: "Class 10K", label: "Cleanroom", desc: "Contamination-free coating environment" },
                ].map((item) => (
                  <div key={item.label} className="card-dark p-6">
                    <p className="font-display text-2xl font-black text-vault">
                      {item.stat}
                    </p>
                    <p className="mt-1 text-xs font-bold uppercase tracking-wider text-silver-bright">
                      {item.label}
                    </p>
                    <p className="mt-1.5 text-xs text-silver">{item.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          VALUES
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mb-10 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> What We Stand For
            </p>
            <h2 className="display-lg text-silver-bright">Our Values</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Quality First",
                icon: "shield",
                desc: "Every batch is tested for color accuracy, adhesion, and durability. ISO 9001 and IATF 16949 aren't certificates on a wall — they're how we operate every single day.",
              },
              {
                title: "Relentless Innovation",
                icon: "lightbulb",
                desc: "From electro-gloss to liquid metal to self-healing topcoats, we're constantly pushing what wrap film can do. Our R&D team files new formulations every quarter.",
              },
              {
                title: "Global Reach",
                icon: "globe",
                desc: "We've shipped to 150+ countries with consolidated freight options that make international ordering simple and affordable. Wherever you are, we can get film to you.",
              },
              {
                title: "Direct Support",
                icon: "chat",
                desc: "No call centers, no ticket queues. When you message us, you're talking to people who know the product inside-out — because they helped build it.",
              },
            ].map((value, i) => (
              <Reveal key={value.title} delay={i * 0.08}>
                <div className="card-dark h-full p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-vault/10">
                    {value.icon === "shield" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-2-8l-7 3v6c0 5 3 9 7 10 4-1 7-5 7-10V6l-7-3z" />
                      </svg>
                    )}
                    {value.icon === "lightbulb" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    )}
                    {value.icon === "globe" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 00-0 20" />
                      </svg>
                    )}
                    {value.icon === "chat" && (
                      <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    )}
                  </div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-silver">{value.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          STATS BAR
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {[
              { stat: "700+", label: "Colors Manufactured" },
              { stat: "150+", label: "Countries Shipped To" },
              { stat: "1M+", label: "Rolls Produced" },
              { stat: "99.2%", label: "QC Pass Rate" },
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
          CERTIFICATIONS
          ════════════════════════════════════════════════════════════ */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <Reveal>
              <div>
                <p className="eyebrow mb-3">
                  <span className="text-vault">●</span> Certified Quality
                </p>
                <h2 className="display-lg text-silver-bright">
                  Quality You Can<br />Audit
                </h2>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-silver">
                  Our manufacturing processes are certified to international
                  automotive and quality management standards. These aren&apos;t
                  just badges — they&apos;re the systems that ensure every roll
                  of film meets the same spec, batch after batch.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    name: "ISO 9001",
                    full: "Quality Management System",
                    desc: "Internationally recognized standard for quality processes, continuous improvement, and customer satisfaction.",
                  },
                  {
                    name: "IATF 16949",
                    full: "Automotive Quality Standard",
                    desc: "The global automotive industry's quality management standard — the same certification tier required by major automakers.",
                  },
                ].map((cert) => (
                  <div key={cert.name} className="card-dark p-6">
                    <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl bg-vault/10">
                      <svg className="h-7 w-7 text-vault" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-2-8l-7 3v6c0 5 3 9 7 10 4-1 7-5 7-10V6l-7-3z" />
                      </svg>
                    </div>
                    <p className="font-display text-lg font-black text-vault">
                      {cert.name}
                    </p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase tracking-wider text-silver-bright">
                      {cert.full}
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-silver">
                      {cert.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════
          CTA
          ════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-vault/5 blur-[100px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center lg:py-24">
          <h2 className="display-lg text-silver-bright">
            Ready to Work<br />
            <span className="text-vault">Direct with the Factory?</span>
          </h2>
          <p className="mt-4 text-sm text-silver">
            Whether you need a single roll or a container load, we&apos;re here
            to help you find the right film at the right price.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/products" className="btn-primary">
              Browse the Catalog
            </Link>
            <a
              href={whatsappLink("Hello WrapVault, I'd like to learn more about your company and films.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-signal"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
