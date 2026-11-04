import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Terms of Service",
  description: "The terms and conditions for using WrapVault's website and purchasing wrap films.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <nav className="mb-4 flex items-center gap-2 text-[11px] font-medium text-silver">
        <Link href="/" className="transition-colors hover:text-vault">Home</Link>
        <span className="text-ink-border">/</span>
        <span className="text-silver-bright">Terms of Service</span>
      </nav>

      <p className="eyebrow mb-4">
        <span className="text-vault">●</span> Legal
      </p>
      <h1 className="display-lg text-silver-bright">Terms of Service</h1>
      <p className="mt-2 text-sm text-silver">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-10 space-y-8">
        <Section title="1. Acceptance of Terms">
          <p>
            By accessing and using the {site.name} website, you agree to be
            bound by these Terms of Service and all applicable laws and
            regulations. If you do not agree with any part of these terms,
            please do not use our website or services.
          </p>
        </Section>

        <Section title="2. Products and Pricing">
          <p>
            All products displayed on our website are subject to availability.
            We reserve the right to modify or discontinue any product without
            prior notice. Prices are listed in USD (converted from CNY at our
            internal exchange rate) and may fluctuate based on raw material
            costs and currency markets. The price at the time of order
            confirmation is the final price. We are not responsible for pricing
            errors or typographical mistakes.
          </p>
        </Section>

        <Section title="3. Orders and Payment">
          <p>
            Orders are processed through WhatsApp confirmation with our sales
            team. We verify stock availability and shipping costs before
            requesting payment. Payment methods include bank transfer (T/T),
            PayPal, and other methods as agreed. Orders are not considered
            confirmed until payment is received in full. We reserve the right
            to refuse or cancel any order at our discretion.
          </p>
        </Section>

        <Section title="4. Shipping and Delivery">
          <p>
            Shipping times are estimates and not guaranteed. We are not liable
            for delays caused by shipping carriers, customs processing, weather
            events, or other factors beyond our control. Risk of loss passes
            to the buyer upon delivery to the shipping carrier for standard
            shipments. For freight shipments, Incoterms agreed at order
            confirmation apply. Please review our <Link href="/legal/shipping" className="text-vault hover:underline">Shipping Policy</Link> for details.
          </p>
        </Section>

        <Section title="5. Returns and Refunds">
          <p>
            Due to the nature of our products (custom-cut film rolls), returns
            are accepted only for defective or incorrectly shipped items, and
            must be reported within 7 days of receipt. Custom orders, cut
            lengths, and clearance items are non-returnable. Please review our{" "}
            <Link href="/legal/returns" className="text-vault hover:underline">Returns Policy</Link> for full details.
          </p>
        </Section>

        <Section title="6. Product Warranty">
          <p>
            Our films carry manufacturer warranties against peeling, cracking,
            fading, and yellowing: 5 years for PET Color Change films and 10
            years for Self-Healing PPF films. Warranty claims must be
            accompanied by proof of purchase and photographic evidence. Warranty
            does not cover damage from improper installation, accidents,
            neglect, or unauthorized modifications.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content on this website — including text, graphics, logos,
            images, and software — is the property of {site.name} or its content
            providers and is protected by international copyright laws.
            Unauthorized use, reproduction, or distribution of any content is
            prohibited. Product images are protected against downloading and
            reuse.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            {site.name} shall not be liable for any indirect, incidental,
            special, or consequential damages arising from the use of our
            products or website. Our total liability for any claim shall not
            exceed the purchase price of the product(s) in question. We are not
            responsible for installation outcomes — professional installation
            is recommended.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These terms shall be governed by and construed in accordance with
            the laws of the People&apos;s Republic of China, without regard to
            conflict of law principles. Any disputes shall be resolved through
            amicable negotiation, and if unresolved, through arbitration in
            the jurisdiction where our manufacturing facility is located.
          </p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>
            We reserve the right to modify these Terms of Service at any time.
            Changes will be posted on this page with an updated revision date.
            Continued use of our website after changes constitutes acceptance
            of the modified terms.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>
            Questions about these terms? Contact us:
          </p>
          <ul className="mt-3 space-y-1">
            <li>• Email: <a href={`mailto:${site.email}`} className="text-vault hover:underline">{site.email}</a></li>
            <li>• WhatsApp: +{site.whatsapp}</li>
          </ul>
        </Section>
      </div>

      <div className="mt-12 flex gap-3">
        <Link href="/legal/privacy" className="btn-ghost !py-2.5 text-[11px]">
          ← Privacy Policy
        </Link>
        <Link href="/legal/shipping" className="btn-ghost !py-2.5 text-[11px]">
          Shipping Policy →
        </Link>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold text-silver-bright">{title}</h2>
      <div className="mt-3 space-y-2 text-sm leading-relaxed text-silver-light">
        {children}
      </div>
    </div>
  );
}
