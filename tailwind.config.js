/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './app/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        kamerik: ['Kamerik205-Book', 'sans-serif'],
        bold: ['Kamerik205-Bold', 'sans-serif'],
        heavy: ['Kamerik205-Heavy', 'sans-serif'],
      },
      colors: {
        card: '#FAAF05',
      },
    },
  },
  plugins: [],
};
