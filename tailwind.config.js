/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        hgv: {
          50: '#eff8ff',
          100: '#ddf1ff',
          200: '#b4e3ff',
          300: '#71ceff',
          400: '#26b6ff',
          500: '#009cfe',
          600: '#007cda',
          700: '#0062b0',
          800: '#005491',
          900: '#034477',
          950: '#023058',
        },
        hgv_red: {
          50: '#fff1f0',
          100: '#ffe0de',
          200: '#ffc5c2',
          300: '#ff9d98',
          400: '#ff655d',
          500: '#ff352b',
          600: '#f7160b',
          700: '#d50f05',
          800: '#ac1008',
          900: '#8d150f',
          950: '#4e0501',
        },
      },
      fontFamily: {
        sans: ['"Oswald"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
