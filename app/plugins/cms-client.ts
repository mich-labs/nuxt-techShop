import { StrapiClient } from '~~/cms';


export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    const baseUrl = import.meta.server ? config.cmsUrl : config.public.cmsUrl;
    const client = new StrapiClient({
        baseURL: baseUrl,
        token: config.public.cmsAccessToken
    })
    return {
        provide: {
            cms: client
        }
    }
})