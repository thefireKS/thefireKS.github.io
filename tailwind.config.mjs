/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        surface: "var(--surface-color)",
        "surface-hover": "var(--surface-hover)",
        brand: "var(--brand-color)",
        "brand-secondary": "var(--brand-color-secondary)",
        text: "var(--text-color)",
        highlight: "var(--highlight)",
      },
      fontFamily: {
        heading: "var(--font-heading)",
      },
    },
  },
  plugins: [],
};
