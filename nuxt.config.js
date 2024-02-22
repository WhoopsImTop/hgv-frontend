export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Hamburger Gästeführer Verein e.V.',
    htmlAttrs: {
      lang: 'de',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Entdecken Sie Hamburg mit den Hamburger Gästeführern! Wir bieten 70 einzigartige Touren in 15 Sprachen an, von klassischen Highlights bis zu individuellen Erkundungen. Buchen Sie jetzt und erleben Sie Hamburg mit Experten an Ihrer Seite',
      },
      {
        name: 'keywords',
        content:
          'Hamburg, Gästeführer, Gästeführung, Stadtführung, Stadtführer, Tour, Touren, Gruppen, Gruppenreise, Gruppenreisen, Reise, Reisen, Hamburg Tourismus, Hamburg Tourismus GmbH, Hamburg Tourismus Marketing GmbH, Hamburg Tourismus Marketing, Hamburg Tourismus Marketing GmbH, Hamburg Tourismus Marketing, Hamburg, khri8! more playgrounds',
      },
      { name: 'format-detection', content: 'telephone=no' },
      {
        property: 'og:site_name',
        content: 'Hamburger Gästeführer Verein e.V.',
      },
      {
        property: 'og:title',
        content: 'Hamburger Gästeführer Verein e.V.',
      },
      {
        property: 'og:description',
        content:
          'Entdecken Sie Hamburg mit den Hamburger Gästeführern! Wir bieten 70 einzigartige Touren in 15 Sprachen an, von klassischen Highlights bis zu individuellen Erkundungen. Buchen Sie jetzt und erleben Sie Hamburg mit Experten an Ihrer Seite',
      },
    ],
    link: [
      { rel: 'stylesheet', href: 'https://use.typekit.net/wik8vol.css' },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/main.css'],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'de',
    strategy: 'prefix',
  },

  'nuxt-compress': {
    gzip: {
      threshold: 8192,
    },
    brotli: {
      threshold: 8192,
    },
  },

  markdownit: {
    runtime: true, // Support `$md()`
    preset: 'default',
    linkify: true,
    breaks: true,
    html: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    '@nuxtjs/markdownit',
    '@nuxtjs/i18n',
    [
      'nuxt-gmaps',
      {
        key: 'AIzaSyBw_QNEvvoRbs-czfH2GbPPkupqDdJTxhg',
      },
    ],
  ],

  plugins: ['~/plugins/jsonld'],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {
    path: 'content',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },

  generate: {
    fallback: true,
  },
}
