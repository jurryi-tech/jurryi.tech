import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FDFBF7",
        foreground: "#1A1A1A",
        cream: "#FDFBF7",
        "cream-dark": "#F3EFE8",
        "warm-grey": "#E8E4DD",
        "cool-grey": "#F5F5F3",
        charcoal: "#2C2C2C",
        "text-primary": "#1A1A1A",
        "text-secondary": "#5A5A5A",
        "text-muted": "#8B7355",
        gold: "#C5A44E",
        "gold-light": "rgba(197,164,78,0.15)",
        usa: {
          primary: "#1B2A4A",
          secondary: "#4A7BF7",
          accent: "#C5A44E",
        },
        india: {
          primary: "#C45B28",
          secondary: "#F5F0E6",
          accent: "#1A7A6D",
        },
        europe: {
          primary: "#003399",
          secondary: "#B8C4D4",
          accent: "#FFD700",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Times New Roman", "Times", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      animation: {
        "bounce-slow": "bounce-slow 2s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "spin-slow-reverse": "spin-reverse 20s linear infinite",
        "pulse-gold": "pulse-gold 2s ease-in-out infinite",
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(8px)" },
        },
        "pulse-gold": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "spin-reverse": {
          from: { transform: "rotate(360deg)" },
          to: { transform: "rotate(0deg)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
