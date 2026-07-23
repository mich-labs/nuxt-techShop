import { mapCarouselSection } from "~/components/widgets/hero-carousel";
import { mapPromoSection } from "~/components/widgets/promo-section";
import { DEFAULT_SEO } from "~/components/shared/lib/seo/defaultSeo";


export default async function useHomePage() {
    const { public: { cmsUrl } } = useRuntimeConfig();
    const { data, error } = await useAsyncData('homePage', async () => {
        const { $cms } = useNuxtApp();
        return await $cms.glavnaya.find({
            populate: {
                promoSection1: {
                    populate: '*',
                },
                promoSection2: {
                    populate: '*',
                },
                slider: {
                    populate: {
                        banners: {
                            populate: '*',
                        },
                        button: true,
                    },
                },
                seo: true,
            },
        });

    })

    if (error.value) {
        throw createError({
            statusCode: 500,
            statusMessage: 'Не удалось загрузить главную страницу',
            fatal: true,
        });
    }

    return {
        carouselData: data.value?.slider ? mapCarouselSection(data.value.slider, cmsUrl) : null,
        promoSection1: data.value?.promoSection1 ? mapPromoSection(data.value.promoSection1, cmsUrl) : null,
        promoSection2: data.value?.promoSection2 ? mapPromoSection(data.value.promoSection2, cmsUrl) : null,
        seo: { title: data.value?.seo?.title || DEFAULT_SEO.title, description: data.value?.seo?.description || DEFAULT_SEO.description },
    }
}
