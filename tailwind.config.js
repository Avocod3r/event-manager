/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0D9488",
          light: "#5EEAD4",
          dark: "#0F766E",
        },
        secondary: {
          DEFAULT: "#334155",
          light: "#64748B",
          dark: "#1E293B",
        },
        accent: {
          DEFAULT: "#F59E0B",
          light: "#FCD34D",
          dark: "#D97706",
        },
        background: {
          light: "#F1F5F9",
          DEFAULT: "#E2E8F0",
          dark: "#CBD5E1",
        },
        text: {
          DEFAULT: "#1E293B",
          light: "#475569",
          dark: "#0F172A",
        },
        danger: "#EF4444",
        sucess: "#22C55E",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
