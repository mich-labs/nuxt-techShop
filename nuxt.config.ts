// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-04-27',
  css: ['~/assets/scss/theme.scss'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
