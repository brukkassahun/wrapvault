import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0B",
          light: "#131316",
          card: "#1A1A1E",
          border: "#2A2A2E",
        },
        cream: "#FAF9F6",
        silver: {
          DEFAULT: "#8B8B90",
          light: "#A0A0A5",
          bright: "#E8E8EC",
        },
        vault: {
          DEFAULT: "#00E5FF",
          glow: "#00B8D4",
        },
        flame: "#FF3D71",
        signal: "#00E676",
        flare: "#FFAB00",
        slate: {
          DEFAULT: "#6B7280",
          light: "#4B5563",
          muted: "#9CA3AF",
        },
      },
      fontFamily: {
        display: ["var(--font-sans)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        "slide-in": "slide-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-in": {
          from: { opacity: "0", transform: "translateX(-12px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
