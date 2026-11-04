import { site, whatsappLink } from "@/lib/site";
import ContactForm from "@/components/ContactForm";
import CopyWeChatButton from "@/components/CopyWeChatButton";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WrapVault. WhatsApp, WeChat, email, or send us a message. We respond within 24 hours.",
};

export default function ContactPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="eyebrow mb-4">
            <span className="text-vault">●</span> Get In Touch
          </p>
          <h1 className="display-xl text-silver-bright">
            Let&apos;s Talk<br />
            <span className="text-vault">Wrap Films</span>
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-silver">
            Questions about a color? Need a bulk quote? Want to match a specific
            shade? Our team is standing by. Reach us on WhatsApp for the fastest
            response, or send us a detailed message below.
          </p>
        </div>
      </section>

      {/* ─── Contact channels ─── */}
      <section className="border-b border-ink-border">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {/* WhatsApp */}
            <Reveal>
              <a
                href={whatsappLink("Hello WrapVault, I'd like to inquire about your wrap films.")}
                target="_blank"
                rel="noopener noreferrer"
                className="card-dark group block p-6 transition-all hover:border-signal/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-signal/10">
                  <svg className="h-6 w-6 text-signal" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                  WhatsApp
                </h3>
                <p className="mt-1 text-xs text-silver">Fastest response</p>
                <p className="mt-3 font-display text-lg font-black text-signal">
                  +{site.whatsapp}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-signal">
                  Open Chat
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </Reveal>

            {/* WeChat */}
            <Reveal delay={0.08}>
              <div className="card-dark p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-vault/10">
                  <svg className="h-6 w-6 text-vault" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM6.598 7.833c.76 0 1.376.615 1.376 1.375s-.616 1.375-1.376 1.375-1.375-.615-1.375-1.375.616-1.375 1.375-1.375zm4.185 0c.76 0 1.375.615 1.375 1.375s-.615 1.375-1.375 1.375-1.375-.615-1.375-1.375.616-1.375 1.375-1.375zm4.185 3.73c-.052 0-.102.003-.153.005-.037.002-.074.005-.111.005-3.737 0-6.766 2.776-6.766 6.205 0 1.49.59 2.846 1.558 3.872a.497.497 0 0 1 .107.534l-.277 1.04c-.014.052-.035.104-.035.158 0 .122.097.22.218.22a.244.244 0 0 0 .125-.04l1.43-.836a.645.645 0 0 1 .536-.073 7.59 7.59 0 0 0 2.123.302c3.737 0 6.766-2.776 6.766-6.205 0-3.429-3.029-6.205-6.766-6.205zm-2.236 3.57c.57 0 1.031.461 1.031 1.031s-.461 1.031-1.031 1.031-1.031-.461-1.031-1.031.461-1.031 1.031-1.031zm4.471 0c.57 0 1.031.461 1.031 1.031s-.461 1.031-1.031 1.031-1.031-.461-1.031-1.031.461-1.031 1.031-1.031z" />
                  </svg>
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                  WeChat
                </h3>
                <p className="mt-1 text-xs text-silver">Add our ID</p>
                <p className="mt-3 font-display text-lg font-black text-vault">
                  {site.wechat}
                </p>
                <CopyWeChatButton wechatId={site.wechat} />
              </div>
            </Reveal>

            {/* Email */}
            <Reveal delay={0.16}>
              <a
                href={`mailto:${site.email}`}
                className="card-dark group block p-6 transition-all hover:border-flare/40"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-flare/10">
                  <svg className="h-6 w-6 text-flare" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M3 4a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H3zm0 2h14v.5l-7 4-7-4V6z" />
                  </svg>
                </div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider text-silver-bright">
                  Email
                </h3>
                <p className="mt-1 text-xs text-silver">For detailed inquiries</p>
                <p className="mt-3 break-all font-display text-sm font-bold text-flare">
                  {site.email}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-flare">
                  Send Email
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── Contact form ─── */}
      <section className="border-b border-ink-border bg-white">
        <div className="mx-auto max-w-3xl px-6 py-16 lg:px-10">
          <div className="mb-8 text-center">
            <p className="eyebrow mb-3">
              <span className="text-vault">●</span> Send a Message
            </p>
            <h2 className="display-lg text-silver-bright">Tell Us What You Need</h2>
            <p className="mt-2 text-sm text-silver">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
              For urgent matters, WhatsApp is fastest.
            </p>
          </div>

          <div className="card-dark p-6 lg:p-8">
            <ContactForm inquiryType="general" showProductField />
          </div>
        </div>
      </section>
    </>
  );
}

