/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // <-- add this line
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        maroon: {
          50: '#fff0f0',
          100: '#ffe6e6',
          200: '#ffcccc',
          300: '#ff9999',
          400: '#ff6666',
          500: '#cc0000',  // Classic maroon base
          600: '#990000',
          700: '#800000',  // Traditional maroon
          800: '#660000',
          900: '#4d0000',
        },
      },
    },
  },
  plugins: [],
};
