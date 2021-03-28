const laravelNuxt = require('laravel-nuxt')

module.exports = laravelNuxt({
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - portfolio',
    title: 'portfolio',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/main.scss'
  ],

  styleResources: {
    scss: [
      '~/assets/scss/variables.scss'
    ]
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/style-resources'
  ],

  axios: {
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    breakpoint: {
      thresholds: {
        xs: 340,
        sm: 540,
        md: 830,
        lg: 1200
      },
      scrollBarWidth: 0
    },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#fff',
          accent: '#00D1FF',
          secondary: {
            base: '#0F0F0F',
            darken1: '#000'
          },
          info: {
            base: '#444444',
            lighten1: '#E5E5E5'
          }
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
})
