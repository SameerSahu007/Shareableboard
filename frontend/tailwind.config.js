/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'roboto-mono': ['"Roboto Mono', 'serif'] // Ensure fonts with spaces have " " surrounding it.
    },
    extend: {},
  },
  plugins: [],
}

