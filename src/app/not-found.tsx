import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      {/* Glitch-style 404 */}
      <div className="relative">
        <p className="font-display text-[120px] font-black leading-none tracking-tighter text-ink-card sm:text-[180px]">
          404
        </p>
        <p className="absolute inset-0 flex items-center justify-center font-display text-[120px] font-black leading-none tracking-tighter text-vault/20 sm:text-[180px]">
          404
        </p>
      </div>

      <p className="eyebrow mt-6">
        <span className="text-flame">●</span> Lost in the vault
      </p>

      <h1 className="display-lg mt-4 text-silver-bright">
        This Page Rolled Away
      </h1>

      <p className="mt-3 max-w-md text-sm text-silver">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&aposs get you back to browsing 700+ premium wrap colors.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn-primary">
          ← Back to Home
        </Link>
        <Link href="/products" className="btn-ghost">
          Browse All Films
        </Link>
      </div>
    </div>
  );
}
