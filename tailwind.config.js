const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
        },
        white: {
          0: 'rgba(255,255,255,0)',
          10: 'rgba(255,255,255,.1)',
          20: 'rgba(255,255,255,.2)',
          30: 'rgba(255,255,255,.3)',
          40: 'rgba(255,255,255,.4)',
          50: 'rgba(255,255,255,.5)',
          60: 'rgba(255,255,255,.6)',
          70: 'rgba(255,255,255,.7)',
          80: 'rgba(255,255,255,.8)',
          90: 'rgba(255,255,255,.9)',
          100: 'rgba(255,255,255,1)',
        },
        black: {
          0: 'rgba(0,0,0,0)',
          10: 'rgba(0,0,0,.1)',
          20: 'rgba(0,0,0,.2)',
          30: 'rgba(0,0,0,.3)',
          40: 'rgba(0,0,0,.4)',
          50: 'rgba(0,0,0,.5)',
          60: 'rgba(0,0,0,.6)',
          70: 'rgba(0,0,0,.7)',
          80: 'rgba(0,0,0,.8)',
          90: 'rgba(0,0,0,.9)',
          100: 'rgba(0,0,0,1)',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        mono: ['var(--font-code)', ...fontFamily.mono],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')],
}
