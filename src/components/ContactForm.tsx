"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

interface ContactFormProps {
  inquiryType?: string;
  showProductField?: boolean;
  productContext?: string;
}

export default function ContactForm({
  inquiryType = "general",
  showProductField = false,
  productContext,
}: ContactFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone") || null,
      country: formData.get("country") || null,
      message: formData.get("message"),
      inquiry_type: formData.get("inquiry_type") || inquiryType,
      product_name: showProductField ? formData.get("product_name") || productContext : null,
    };

    if (!payload.name || !payload.email || !payload.message) {
      setStatus("error");
      setErrorMsg("Please fill in your name, email, and message.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Submission failed");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="card-dark flex flex-col items-center gap-4 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-signal/15">
          <svg className="h-7 w-7 text-signal" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <h3 className="font-display text-lg font-bold text-silver-bright">
            Message Sent
          </h3>
          <p className="mt-1 text-sm text-silver">
            We&apos;ve received your inquiry and will respond within 24 hours.
            For urgent matters, reach us on WhatsApp.
          </p>
        </div>
        <a
          href={whatsappLink("Hello WrapVault, I just submitted an inquiry on your website.")}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-signal !py-2.5 text-[11px]"
        >
          Chat on WhatsApp Instead
        </a>
        <button
          onClick={() => setStatus("idle")}
          className="text-xs font-medium text-silver transition-colors hover:text-vault"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="inquiry_type" value={inquiryType} />

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="Your full name"
            className="input-field"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Phone / WhatsApp
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="+1 234 567 890"
            className="input-field"
            autoComplete="tel"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="your@email.com"
            className="input-field"
            autoComplete="email"
          />
        </div>
        <div>
          <label htmlFor="country" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            placeholder="United States"
            className="input-field"
            autoComplete="country-name"
          />
        </div>
      </div>

      {showProductField && (
        <div>
          <label htmlFor="product_name" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
            Product of Interest
          </label>
          <input
            type="text"
            id="product_name"
            name="product_name"
            defaultValue={productContext || ""}
            placeholder="e.g. Electro-Gloss Crimson PET Wrap"
            className="input-field"
          />
        </div>
      )}

      <div>
        <label htmlFor="message" className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.18em] text-silver">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your project, quantities needed, target timeline, etc."
          className="input-field resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-xs font-medium text-flame">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
      >
        {status === "loading" ? "Sending…" : "Send Inquiry"}
      </button>

      <p className="text-center text-[11px] text-silver">
        We respond within 24 hours · Your data is never shared
      </p>
    </form>
  );
}
