import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:    ["'Noto Serif'", "Georgia", "serif"],
        sans:     ["'Manrope'", "sans-serif"],
        mono:     ["'JetBrains Mono'", "monospace"],
        display:  ["'Noto Serif'", "Georgia", "serif"],
      },
      colors: {
        "bg":                     "#111319",
        "surface":                "#111319",
        "surface-container-low":  "#191c21",
        "surface-container":      "#1d2025",
        "surface-container-high": "#272a30",
        "on-surface":             "#e1e2ea",
        "on-surface-variant":     "#d6c4ac",
        "primary":                "#ffba38",
        "primary-container":      "#ffb300",
        "on-primary":             "#432c00",
        "on-primary-container":   "#6b4900",
        "secondary":              "#e9c176",
        "outline":                "#9e8e78",
        "outline-variant":        "#514532",
      },
      animation: {
        "fade-up":  "fadeUp 0.6s ease forwards",
        "fade-in":  "fadeIn 0.8s ease forwards",
        "bounce-y": "bounceY 1.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp:   { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        fadeIn:   { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        bounceY:  { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(8px)" } },
      },
    },
  },
  plugins: [],
};

export default config;
