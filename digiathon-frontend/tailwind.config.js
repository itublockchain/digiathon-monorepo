/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        header: 'rgba(18,35,51,0.3)',
        headerScroll: 'rgba(74,100,125,0.9)',
      },
    },
  },
  plugins: [],
};
