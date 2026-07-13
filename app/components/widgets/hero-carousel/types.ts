import type { BannerModel } from "~/components/entities/banner";
import type { AppLinkProps } from "~/components/shared/ui/AppLink.vue";
import type { WidgetsSlajderGetPayload } from "~~/cms";

export type CarouselSectionDto = WidgetsSlajderGetPayload<{
    populate: {
        banners: {
            populate: '*',
        },
        button: true,
    }
}>

export interface CarouselSectionModel {
    title: string;
    content: string;
    sectionLink: AppLinkProps;
    banners: BannerModel[];
}