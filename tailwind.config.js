/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", "sans-serif"],
        brand: ["Paytone One", "sans-serif"],
      },
      colors: {
        primary: "#2E90E6",
        secondary: "#E0E85D",
        accent: "#E88F8B",
        black: "#222222",
      },
    },
  },
  plugins: [],
};
