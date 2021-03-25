const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

let edorble = {
  '50': '#9bbac9',
  '100': '#87acbe',
  '200': '#739eb3',
  '300': '#5f90a9',
  '400': '#4b829e',
  '500': '#377493',
  '600': '#326884',
  '700': '#2c5d76',
  '800': '#275167',
  '900': '#214658',
}

colors.edorble = edorble

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: colors,
      animation: {
        'spin-slow': 'spin 10s linear infinite',
      }
      // fontFamily: {
      //   // sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      //   'body': ['Quicksand'],
      // },
      // gridRow: {
      //   'span-16': 'span 16 / span 16',
      // }
      // height: {
      //     '1/2': '50vh',
      //     '1/4': '25vh',
      //     '1/8': '12vh'
      // },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
