import { StrapiClient } from '~~/cms';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const client = new StrapiClient({
        baseURL: config.cmsUrl,
        token: config.cmsAccessToken
    })
    return {
        provide: {
            cms: client
        }
    }
})