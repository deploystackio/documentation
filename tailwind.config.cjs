/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{md,mdx}", // Added for user's docs
    "./node_modules/fumadocs-ui/**/*.{js,ts,jsx,tsx}" // For Fumadocs UI components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
