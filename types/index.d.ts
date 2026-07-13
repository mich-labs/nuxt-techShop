declare module 'nuxt/schema' {
    interface RuntimeConfig {
        cmsUrl: string;
    }
    interface PublicRuntimeConfig {
        cmsUrl: string;
        cmsAccessToken: string;
    }
}

export { }
