"use client";

import { useState } from "react";
import { site } from "@/lib/site";

/**
 * Newsletter email signup with inline success state.
 * On submit, shows a confirmation message (no backend call needed
 * — wire up to your ESP in the handleSubmit function).
 */
export default function NewsletterForm({
  className = "",
}: {
  className?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      // ─── Wire to your ESP (Mailchimp, ConvertKit, etc.) here ───
      // await fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) });
      await new Promise((resolve) => setTimeout(resolve, 800)); // placeholder
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <svg
          className="h-5 w-5 shrink-0 text-signal"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
            clipRule="evenodd"
          />
        </svg>
        <p className="text-sm font-medium text-silver-bright">
          You&apos;re on the list. Watch your inbox for exclusive drops &amp; factory pricing.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`}>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          disabled={status === "loading"}
          className="input-field flex-1"
          aria-label="Email address"
          autoComplete="email"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary shrink-0 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Subscribing…" : "Subscribe"}
        </button>
      </div>
      {status === "error" && (
        <p className="mt-2 text-xs font-medium text-flame">{errorMsg}</p>
      )}
      <p className="mt-2 text-[11px] text-silver">
        Join {site.name} insiders — no spam, unsubscribe anytime.
      </p>
    </form>
  );
}
