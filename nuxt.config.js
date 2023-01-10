import {
  // contract addresses
  GreeterContractAddress,
  // abis
  GreeterContractABI,
} from './contracts/production'

import {
  // staging contract addresses
  StagingGreeterContractAddress,
  // staging abis
  StagingGreeterContractABI,
} from './contracts/staging'

const DEBUG = process.env.NODE_ENV !== 'production'
const APP_NAME = 'Block'
const APP_DESCRIPTION = 'Dapp starter template using Nuxt.'
const APP_URL = 'http://localhost:3000'
const API_URL = 'http://localhost:3000'

export default {
  ssr: false,
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + APP_NAME,
    title: APP_NAME || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: APP_DESCRIPTION || '',
      },
      // OG Tag setup
      // https://vue-meta.nuxtjs.org/api/#meta
      {
        property: 'og:type',
        content: 'website',
        vmid: 'og:type',
      },
      {
        property: 'og:title',
        content: APP_NAME,
        vmid: 'og:title',
      },
      {
        property: 'og:description',
        content: APP_DESCRIPTION,
        vmid: 'og:description',
      },
      {
        property: 'og:site_name',
        content: APP_URL,
        vmid: 'og:site_name',
      },
      {
        property: 'og:url',
        content: APP_URL,
        vmid: 'og:url',
      },
      {
        property: 'og:image',
        content: APP_URL + '/icon.png',
        vmid: 'og:image',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Poppins&display=swap',
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/css/global.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/repository' },
    { src: '~/plugins/components/icons' },
    { src: '~/plugins/web3' },
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/stylelint-module
    '@nuxtjs/stylelint-module',
    '@nuxtjs/vuetify',
    'vue-toastification/nuxt',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['vue-scrollto/nuxt', { duration: 1000 }],
  ],
  /**
   * Public runtime configs
   */
  publicRuntimeConfig: {
    appName: APP_NAME,
    debug: DEBUG,
    // contracts
    greeterContractAddress: DEBUG
      ? StagingGreeterContractAddress
      : GreeterContractAddress,
    greeterContractABI: DEBUG ? StagingGreeterContractABI : GreeterContractABI,
  },
  /**
   * Private runtime configs
   */
  privateRuntimeConfig: {},
  /**
   *  PWA module configuration
   *  https://pwa.nuxtjs.org/setup.html
   */
  pwa: {
    meta: {
      title: APP_NAME,
    },
    manifest: {
      name: APP_NAME,
      short_name: APP_NAME,
      description: APP_DESCRIPTION,
      start_url: APP_URL,
      lang: 'en',
    },
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: API_URL,
    debug: DEBUG,
  },
  toast: {
    transition: 'Vue-Toastification__fade',
    maxToasts: 20,
    newestOnTop: true,
    position: 'bottom-left',
    timeout: 5000,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    pauseOnHover: true,
    draggable: false,
    draggablePercent: 0.6,
    showCloseButtonOnHover: true,
    hideProgressBar: true,
    closeButton: 'button',
    icon: true,
    rtl: false,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    optionsPath: './vuetify.options.js',
  },
}
