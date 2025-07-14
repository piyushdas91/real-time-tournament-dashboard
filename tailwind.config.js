/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',        // App directory
    './components/**/*.{js,ts,jsx,tsx}', // Reusable components
    './pages/**/*.{js,ts,jsx,tsx}',      // If you're using /pages
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
