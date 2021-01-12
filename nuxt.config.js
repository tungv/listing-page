const webpack = require('webpack');
import axios from 'axios'
import { DEFAULT_ITEM_PER_PAGE } from './constants';

export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',
  generate: {
    async routes() {
      function postRoutes() {
        return axios
          .post('https://urich-server.herokuapp.com/api/web/post/popular')
          .then((r) => r.data.map((post) => {
            return {
              route: `post/${post.id}`,
              payload: post
            }
          }))
      }
      const response = await axios
        .all([postRoutes()])
        .then(function (results) {
          const merged = [].concat(...results)
          return merged
        })
      return response
    }
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'listing-page',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "listing-page",
      },
      {
        hid: "og:image",
        property: "og:image",
        content:
          "/default-thumbnail-social-share.png",
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~assets/scss/base.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/filters.js',
    '~/plugins/vue-observe-visibility.client.js',
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/dotenv',
    ['@nuxtjs/axios', { baseURL: 'https://urich-server.herokuapp.com/api/web' }],
    '@nuxtjs/proxy',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg',
    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-regular-svg-icons',
            icons: ['faHeart', 'faComment', 'faUser']
          },
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: []
          }
        ]
      }
    ],
    '@nuxtjs/netlify-files',
    '@nuxt/content',
    'vue-social-sharing/nuxt',
    '@nuxtjs/moment',
    [
      '@nuxtjs/device',
      { defaultUserAgent: 'Mozilla/5.0 (Linux; Android 5.1.1; Nexus 6 Build/LYZ28E) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Mobile Safari/537.36' }
    ]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    vendor: ['lodash'],
    plugins: [
      new webpack.ProvidePlugin({
        '_': 'lodash'
      }),
    ],
  },
  env: {
    baseUrl: process.env.BASE_URL
  },
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'https://urich-server.herokuapp.com/api/web',
    proxyHeaders: false,
    credentials: false,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json, text/plain, */*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
      'Access-Control-Allow-Credentials': true
    },
    proxy: true
  },
  proxy: {
    '/api/': { target: process.env.BASE_URL, pathRewrite: { '^/api/': '' } }
  },
  styleResources: {
    scss: ['./assets/scss/*.scss']
  },
  script: [
    { src: '/js/fb-sdk.js' }
  ]
}
