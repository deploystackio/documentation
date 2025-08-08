/** @type {import('tailwindcss').Config} */
// Note: With Tailwind CSS v4, this config file is deprecated.
// All configuration is now done in CSS using @theme directive.
// This file is kept for compatibility but can be removed.
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{md,mdx}",
    "./node_modules/fumadocs-ui/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [],
}
