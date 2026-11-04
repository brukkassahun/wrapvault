"use client";

import Link from "next/link";

interface LogoProps {
  variant?: "dark" | "light";
  href?: string;
  className?: string;
  showText?: boolean;
}

/**
 * Hexagonal vault badge with "WV" monogram and cyan accent stroke.
 * "light" variant = for light/white backgrounds (current theme).
 * "dark" variant = for dark backgrounds.
 */
export function LogoMark({
  variant = "light",
  className = "",
}: {
  variant?: "dark" | "light";
  className?: string;
}) {
  const stroke = variant === "dark" ? "#00E5FF" : "#00B8D4";
  const textFill = variant === "dark" ? "#E8E8EC" : "#0A0A0B";
  const innerBg = variant === "dark" ? "#131316" : "#FFFFFF";

  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hexagon outline */}
      <path
        d="M24 2L43.6 13.5V34.5L24 46L4.4 34.5V13.5L24 2Z"
        fill={innerBg}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Inner hexagon accent */}
      <path
        d="M24 8L37.9 16V32L24 40L10.1 32V16L24 8Z"
        stroke={stroke}
        strokeWidth="1"
        strokeOpacity="0.3"
        strokeLinejoin="round"
      />
      {/* WV monogram */}
      <text
        x="24"
        y="30"
        textAnchor="middle"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="14"
        fontWeight="900"
        fill={textFill}
        letterSpacing="-0.5"
      >
        WV
      </text>
      {/* Vault accent dot */}
      <circle cx="24" cy="6" r="1.5" fill={stroke} />
    </svg>
  );
}

export default function Logo({
  variant = "light",
  href = "/",
  className = "",
  showText = true,
}: LogoProps) {
  // In light theme: silver-bright = #1A1A1E (dark) — visible on light bg
  // In dark theme: silver-bright = #E8E8EC (light) — visible on dark bg
  // Always use silver-bright so it adapts to the theme tokens.
  const textColor = "text-silver-bright";

  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="WrapVault — Home"
    >
      <span className="transition-transform duration-300 group-hover:scale-105">
        <LogoMark variant={variant} className="h-9 w-9" />
      </span>
      {showText && (
        <span
          className={`font-display text-lg font-black uppercase tracking-tight ${textColor}`}
        >
          Wrap<span className="text-vault">Vault</span>
        </span>
      )}
    </Link>
  );
}
