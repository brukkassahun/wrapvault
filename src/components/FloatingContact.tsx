"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";

/**
 * Floating contact buttons fixed bottom-right.
 * WhatsApp opens a wa.me link; WeChat copies ID to clipboard.
 */
export default function FloatingContact() {
  const [showWeChatTip, setShowWeChatTip] = useState(false);

  function handleWeChat() {
    navigator.clipboard.writeText(site.wechat).then(() => {
      setShowWeChatTip(true);
      setTimeout(() => setShowWeChatTip(false), 3000);
    });
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {/* WeChat tooltip */}
      {showWeChatTip && (
        <div className="animate-fade-in rounded-xl border border-ink-border bg-ink-card px-4 py-2.5 shadow-2xl shadow-black/50">
          <p className="text-xs font-medium text-silver-bright">
            WeChat ID <span className="font-bold text-vault">{site.wechat}</span> copied to clipboard
          </p>
        </div>
      )}

      {/* WeChat button */}
      <button
        onClick={handleWeChat}
        className="group flex h-12 w-12 items-center justify-center rounded-full bg-ink-card border border-ink-border shadow-lg shadow-black/30 transition-all duration-300 hover:border-vault hover:scale-105"
        aria-label="Copy WeChat ID"
        title={`WeChat: ${site.wechat}`}
      >
        <svg
          className="h-6 w-6 text-silver-light transition-colors group-hover:text-vault"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM6.598 7.833c.76 0 1.376.615 1.376 1.375s-.616 1.375-1.376 1.375-1.375-.615-1.375-1.375.616-1.375 1.375-1.375zm4.185 0c.76 0 1.375.615 1.375 1.375s-.615 1.375-1.375 1.375-1.375-.615-1.375-1.375.616-1.375 1.375-1.375zm4.185 3.73c-.052 0-.102.003-.153.005-.037.002-.074.005-.111.005-3.737 0-6.766 2.776-6.766 6.205 0 1.49.59 2.846 1.558 3.872a.497.497 0 0 1 .107.534l-.277 1.04c-.014.052-.035.104-.035.158 0 .122.097.22.218.22a.244.244 0 0 0 .125-.04l1.43-.836a.645.645 0 0 1 .536-.073 7.59 7.59 0 0 0 2.123.302c3.737 0 6.766-2.776 6.766-6.205 0-3.429-3.029-6.205-6.766-6.205zm-2.236 3.57c.57 0 1.031.461 1.031 1.031s-.461 1.031-1.031 1.031-1.031-.461-1.031-1.031.461-1.031 1.031-1.031zm4.471 0c.57 0 1.031.461 1.031 1.031s-.461 1.031-1.031 1.031-1.031-.461-1.031-1.031.461-1.031 1.031-1.031z" />
        </svg>
      </button>

      {/* WhatsApp button */}
      <a
        href={whatsappLink("Hello WrapVault, I'd like to inquire about your wrap films.")}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-signal shadow-lg shadow-signal/30 transition-all duration-300 hover:scale-105"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <svg
          className="h-7 w-7 text-ink"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </div>
  );
}
