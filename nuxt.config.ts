// import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2026-04-27',
  app: {
    head: {
      title: 'Магазин электроники',
      titleTemplate: '%s | TechShop',
      htmlAttrs: {
        lang: 'ru-RU'
      },
      meta: [
        { name: 'description', content: 'Продажа Электроники / Гаджетов ⭐️ Официальная гарантия ✔️ Скидки % ⚡️ Доставка' }
      ]
    }
  },
  fonts: {
    families: [
      { name: 'Ubuntu', weights: [400, 500, 700], styles: ['normal', 'italic'] }
    ]
  },
  css: ['~/assets/scss/theme.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_breakpoints.mixin.scss" as *;',
        }
      }
    }
  },
  // alias: {
  //   '#types': fileURLToPath(new URL('./types', import.meta.url))
  // },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
      extensions: ['vue']
    }
  ],
  image: {
    format: ['webp'],
  },
  runtimeConfig: {
    cmsUrl: process.env.STRAPI_URL,
    cmsAccessToken: process.env.STRAPI_ACCESS_TOKEN || (() => {
      throw Error('STRAPI_ACCESS_TOKEN is missing')
    })()
  },
  modules: ['@nuxtjs/color-mode', '@nuxt/content', '@nuxt/fonts', '@nuxt/eslint', '@nuxt/image']
})