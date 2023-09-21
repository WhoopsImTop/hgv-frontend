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
    extend: {},
    fontFamily: {
      sans: ['"Oswald"', 'sans-serif'],
    },
    colors: {
      hgv: {
        50: '#eef8ff',
        100: '#dcf1ff',
        200: '#b2e5ff',
        300: '#6dd2ff',
        400: '#20bbff',
        500: '#00a3ff',
        600: '#0081df',
        700: '#0066b4',
        800: '#005795',
        900: '#00477a',
        950: '#003057',
      },
    },
  },
  plugins: [],
}
