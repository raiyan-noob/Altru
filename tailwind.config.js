/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        warm: {
          50: "#fffbeb",
          100: "#fef3c7",
          500: "#f59e0b",
          600: "#d97706",
        },
        skyline: {
          50: "#f0f9ff",
          500: "#0ea5e9",
          600: "#0284c7",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.05), 0 2px 6px -1px rgba(15, 23, 42, 0.03)",
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.35)",
        warmGlow: "0 0 25px -5px rgba(245, 158, 11, 0.3)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#4f46e5",
          "primary-content": "#ffffff",
          "secondary": "#0284c7",
          "secondary-content": "#ffffff",
          "accent": "#f59e0b",
          "accent-content": "#ffffff",
          "neutral": "#1e293b",
          "neutral-content": "#f8fafc",
          "base-100": "#ffffff",
          "base-200": "#f8fafc",
          "base-300": "#e2e8f0",
          "base-content": "#0f172a",
          "info": "#38bdf8",
          "success": "#3b82f6",
          "warning": "#f59e0b",
          "error": "#ef4444",
        },
        dark: {
          "primary": "#6366f1",
          "primary-content": "#ffffff",
          "secondary": "#38bdf8",
          "secondary-content": "#0f172a",
          "accent": "#fbbf24",
          "accent-content": "#0f172a",
          "neutral": "#0f172a",
          "neutral-content": "#e2e8f0",
          "base-100": "#0b0f19",
          "base-200": "#111827",
          "base-300": "#1f2937",
          "base-content": "#f1f5f9",
          "info": "#38bdf8",
          "success": "#60a5fa",
          "warning": "#fbbf24",
          "error": "#f87171",
        },
      },
    ],
  },
};

