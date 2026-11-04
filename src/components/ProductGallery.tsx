"use client";

import { useState } from "react";

interface ProductGalleryProps {
  images?: string[];
  productName: string;
  colorFamily?: string;
  finishType?: string;
}

/**
 * Maps color family names to approximate hex values for swatch placeholders.
 */
const colorSwatches: Record<string, string> = {
  black: "#0A0A0B",
  white: "#FAF9F6",
  grey: "#6B7280",
  silver: "#C0C0C8",
  red: "#E53E3E",
  blue: "#3182CE",
  green: "#38A169",
  yellow: "#ECC94B",
  purple: "#805AD5",
  pink: "#ED64A6",
  orange: "#ED8936",
  gold: "#D4AF37",
  brown: "#8B6F47",
  multi: "linear-gradient(135deg, #FF3D71, #FFAB00, #00E676, #00E5FF, #805AD5)",
};

function getSwatchColor(colorFamily: string): string {
  return colorSwatches[colorFamily.toLowerCase()] ?? "#2A2A2E";
}

export default function ProductGallery({
  images,
  productName,
  colorFamily,
  finishType,
}: ProductGalleryProps) {
  const hasImages = images && images.length > 0;
  const [activeIndex, setActiveIndex] = useState(0);

  // ─── No images: show color swatch display ───
  if (!hasImages) {
    const swatchColor = getSwatchColor(colorFamily ?? "");
    return (
      <div className="space-y-4">
        <div className="card-dark relative aspect-square overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background: swatchColor.startsWith("linear-gradient")
                ? swatchColor
                : `radial-gradient(circle at 35% 30%, ${swatchColor}ee, ${swatchColor}aa 60%, ${swatchColor}66)`,
            }}
          />
          {/* Texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                finishType?.includes("matte")
                  ? "none"
                  : "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%, rgba(255,255,255,0.05) 100%)",
            }}
          />
          <div className="absolute bottom-4 left-4 rounded-lg bg-ink/60 px-3 py-1.5 backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wider text-silver-bright">
              {colorFamily} · {finishType}
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-silver">
          Color reference swatch — actual finish may vary slightly
        </p>
      </div>
    );
  }

  // ─── Image gallery ───
  const activeImage = images[activeIndex];

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div className="card-dark relative aspect-square overflow-hidden bg-ink-light">
        <img
          src={activeImage}
          alt={productName}
          className="h-full w-full object-cover"
          data-protected
          draggable={false}
        />
        {finishType && (
          <div className="absolute left-4 top-4">
            <span className="badge badge-featured backdrop-blur-sm">{finishType}</span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
                i === activeIndex
                  ? "border-vault opacity-100"
                  : "border-ink-border opacity-60 hover:opacity-90"
              }`}
              aria-label={`View image ${i + 1}`}
              aria-selected={i === activeIndex}
            >
              <img
                src={img}
                alt={`${productName} — view ${i + 1}`}
                className="h-full w-full object-cover"
                data-protected
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
