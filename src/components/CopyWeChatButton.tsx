"use client";

import { useState } from "react";

export default function CopyWeChatButton({ wechatId }: { wechatId: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(wechatId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <button
      onClick={handleCopy}
      className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-vault transition-colors hover:text-vault-glow"
    >
      {copied ? (
        <>
          <svg className="h-3.5 w-3.5 text-signal" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
          </svg>
          Copied!
        </>
      ) : (
        <>
          <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M8 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0015.414 5L13 2.586A2 2 0 0011.586 2H8z" />
            <path d="M4 6a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2v-1H8a4 4 0 01-4-4V6z" />
          </svg>
          Copy ID
        </>
      )}
    </button>
  );
}
