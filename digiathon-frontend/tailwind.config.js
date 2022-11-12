const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        maximum: 'calc(100vh - 140px)',
      },
      colors: {
        header: 'rgba(18,35,51,0.3)',
        headerActive: '#3b77ac',
        headerScroll: 'rgba(74,100,125,0.9)',

        buttonDangerBg: colors.pink[500],
        buttonDangerBgActive: colors.pink[700],
        buttonDangerBgHover: colors.pink[600],

        buttonDarkBg: colors.gray[700],
        buttonDarkBgActive: colors.neutral[800],
        buttonDarkBgHover: colors.gray[800],
        buttonDarkColor: colors.gray[600],

        buttonLightBg: colors.neutral[200],
        buttonLightBgActive: colors.neutral[300],
        buttonLightBgHover: colors.gray[200],
        buttonLightColor: colors.blue[600],

        buttonPrimaryBg: colors.indigo[500],
        buttonPrimaryBgActive: colors.indigo[700],
        buttonPrimaryBgHover: colors.indigo[600],

        mainBlue: '#3b77ac',
        mainBlueHover: '#2b6ca6',
      },
    },
  },
  plugins: [],
};
