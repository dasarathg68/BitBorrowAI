/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./utils/**/*.{js,ts,jsx,tsx}"],
  plugins: [require("daisyui")],
  darkTheme: "dark",
  darkMode: ["selector", "[data-theme='dark']"],
  daisyui: {
    themes: [
      {
        light: {
          "color-scheme": "light",
          primary: "#f97316",
          "primary-content": "#f8fafc",
          secondary: "#e2e8f0",
          "secondary-content": "#1e293b",
          accent: "#f97316",
          "accent-content": "#f8fafc",
          neutral: "#1e293b",
          "neutral-content": "#f8fafc",
          "base-100": "#f8fafc",
          "base-200": "#f1f5f9",
          "base-300": "#e2e8f0",
          "base-content": "#1e293b",
          info: "#93BBFB",
          success: "#22c55e",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--n))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
        dark: {
          "color-scheme": "dark",
          primary: "#f97316",
          "primary-content": "#0f172a",
          secondary: "#1e293b",
          "secondary-content": "#f8fafc",
          accent: "#f97316",
          "accent-content": "#0f172a",
          neutral: "#f8fafc",
          "neutral-content": "#0f172a",
          "base-100": "#0f172a",
          "base-200": "#1e293b",
          "base-300": "#0f172a",
          "base-content": "#f8fafc",
          info: "#385183",
          success: "#22c55e",
          warning: "#FFCF72",
          error: "#FF8863",

          "--rounded-btn": "0.5rem",
          "--rounded-badge": "1.9rem",
          "--animation-btn": "0.25s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--btn-focus-scale": "0.95",
          "--border-btn": "1px",
          "--tab-border": "1px",
          "--tab-radius": "0.5rem",

          ".tooltip": {
            "--tooltip-tail": "6px",
            "--tooltip-color": "hsl(var(--p))",
          },
          ".link": {
            textUnderlineOffset: "2px",
          },
          ".link:hover": {
            opacity: "80%",
          },
        },
      },
    ],
  },
  theme: {
    extend: {
      boxShadow: { center: "0 0 12px -2px rgb(0 0 0 / 0.05)" },
      animation: { "pulse-fast": "pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite" },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at center, var(--tw-gradient-stops))",
      },
    },
  },
};
