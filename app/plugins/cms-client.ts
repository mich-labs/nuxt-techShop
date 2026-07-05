import { StrapiClient } from '~~/cms';

export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();

    const client = new StrapiClient({
        baseURL: config.public.cmsUrl,
        token: config.public.cmsAccessToken
    })
    return {
        provide: {
            cms: client
        }
    }
})