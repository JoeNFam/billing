/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        accent: "#00FF00",
        accent2: "#2ECC71",
        background: "#121212"
      },
      fontFamily: {
        sans: ["Inter", "Roboto", "sans-serif"]
      }
    },
  },
  plugins: [],
}