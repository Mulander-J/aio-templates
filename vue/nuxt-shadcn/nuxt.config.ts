const isProd = /prod/i.test(process.env.NUXT_APP_ENV)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  /* Define App/HTML */
  app: {
    head: {
      title: 'Nuxt 3 App',
      charset: 'utf-8',
      meta: [
        { name: 'description', content: "Nuxt 3 App with Shadcn UI" }
      ],
      script: [
        { src: '/flexible.js' }
      ]
    }
  },

  /* Can be override by env */
  runtimeConfig: {},

  /* Dev Server */
  devServer: {
    port: 3000
  },
  nitro: {},
  vite: {
    esbuild: {
      drop: ['debugger'],
      pure: isProd ? ['console.log'] : [],
    }
  },

  /* Global Auto Import */
  components: [
    { path: '~/components/common' },
    { path: '~/components/ui' },
  ],

  /* CSS Plugins */
  css: ['~/assets/css/tailwind.css', '~/assets/css/main.css'],
  postcss: {
    plugins: {
      'autoprefixer': {},
      'tailwindcss': {},
      'postcss-pxtorem': {
        rootValue: 144,
        unitPrecision: 5,
        replace: true,
        minPixelValue: 1,
        propList: [
          'height', 'width',
          'font-size',
          'padding*', 'margin*', '*gap',
          'top', 'bottom', 'left', 'right'
        ],
      }
    }
  },

  /* Modules */
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxt/icon',
    'shadcn-nuxt',
    '@nuxtjs/i18n',
    '@vueuse/nuxt'
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'zh', name: '中文-繁体', file: 'zh.json' },
      { code: 'en', name: 'English', file: 'en.json' }
    ]
  },
  shadcn: {
    prefix: 'reka-',
  },
  icon: {
    customCollections: [
      {
        prefix: 'custom',
        dir: './assets/icons',
        width: 0,
        height: 0,
      }
    ]
  },
})