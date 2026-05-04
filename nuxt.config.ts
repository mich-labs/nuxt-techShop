// import { fileURLToPath } from 'node:url';

export default defineNuxtConfig({
  compatibilityDate: '2026-04-27',
  css: ['~/assets/scss/theme.scss'],
  // alias: {
  //   '#types': fileURLToPath(new URL('./types', import.meta.url))
  // },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ]
})
