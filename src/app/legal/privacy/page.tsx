import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = {
  title: "Privacy Policy",
  description: "How WrapVault collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
      <nav className="mb-4 flex items-center gap-2 text-[11px] font-medium text-silver">
        <Link href="/" className="transition-colors hover:text-vault">Home</Link>
        <span className="text-ink-border">/</span>
        <span className="text-silver-bright">Privacy Policy</span>
      </nav>

      <p className="eyebrow mb-4">
        <span className="text-vault">●</span> Legal
      </p>
      <h1 className="display-lg text-silver-bright">Privacy Policy</h1>
      <p className="mt-2 text-sm text-silver">Last updated: {new Date().getFullYear()}</p>

      <div className="mt-10 space-y-8">
        <Section title="1. Information We Collect">
          <p>
            We collect information you provide directly to us when you fill out
            forms on our website, including inquiry forms, contact forms, and
            newsletter signups. This may include your name, email address, phone
            number, country, and any message content you submit. We also
            automatically collect certain technical data such as your IP
            address, browser type, and pages visited through standard analytics
            tools.
          </p>
        </Section>

        <Section title="2. How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="mt-3 space-y-2">
            <li>• Respond to your inquiries and provide customer support</li>
            <li>• Process and fulfill orders, including shipping coordination</li>
            <li>• Send you updates about products, pricing, and promotions (if you opt in)</li>
            <li>• Improve our website, products, and services through analytics</li>
            <li>• Comply with legal obligations and protect against fraud</li>
          </ul>
        </Section>

        <Section title="3. Information Sharing">
          <p>
            We do not sell, rent, or trade your personal information to third
            parties. We may share your information with trusted service providers
            who assist us in operating our business (e.g., shipping carriers,
            payment processors, analytics providers), but only to the extent
            necessary to provide our services. These providers are bound by
            confidentiality obligations.
          </p>
        </Section>

        <Section title="4. Data Security">
          <p>
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. This includes encrypted data
            transmission (SSL/TLS), secure database storage, and restricted
            access controls. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </Section>

        <Section title="5. Cookies">
          <p>
            Our website uses cookies and similar technologies to enhance your
            browsing experience, analyze traffic patterns, and remember your
            preferences (such as your selected currency). You can control
            cookies through your browser settings. Disabling cookies may affect
            some website functionality.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>
            You have the right to access, correct, or delete your personal
            information held by us. You may also opt out of marketing
            communications at any time by clicking the unsubscribe link in our
            emails or contacting us directly. To exercise any of these rights,
            please contact us at <a href={`mailto:${site.email}`} className="text-vault hover:underline">{site.email}</a>.
          </p>
        </Section>

        <Section title="7. International Transfers">
          <p>
            As we ship globally, your information may be transferred to and
            processed in countries other than your country of residence,
            including China where our manufacturing facility is located. We
            take reasonable steps to ensure your information is adequately
            protected in accordance with this policy and applicable law.
          </p>
        </Section>

        <Section title="8. Children's Privacy">
          <p>
            Our website is not directed to individuals under the age of 16. We
            do not knowingly collect personal information from children. If you
            believe we have collected information from a minor, please contact
            us and we will promptly delete it.
          </p>
        </Section>

        <Section title="9. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page with an updated revision date. We
            encourage you to review this policy periodically.
          </p>
        </Section>

        <Section title="10. Contact Us">
          <p>
            If you have any questions about this Privacy Policy or our data
            practices, please contact us:
          </p>
          <ul className="mt-3 space-y-1">
            <li>• Email: <a href={`mailto:${site.email}`} className="text-vault hover:underline">{site.email}</a></li>
            <li>• WhatsApp: +{site.whatsapp}</li>
            <li>• WeChat: {site.wechat}</li>
          </ul>
        </Section>
      </div>

      <div className="mt-12 flex gap-3">
        <Link href="/legal/terms" className="btn-ghost !py-2.5 text-[11px]">
          Terms of Service →
        </Link>
        <Link href="/" className="btn-ghost !py-2.5 text-[11px]">
          Back Home
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
