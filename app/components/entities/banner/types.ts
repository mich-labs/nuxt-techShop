import type { AppLinkProps } from "~/components/shared/ui/AppLink.vue";
import type { SharedBannerGetPayload } from "~~/cms";


export type BannerDto = SharedBannerGetPayload<{ populate: '*' }>

export type BannerModel = {
    title: string | null;
    content: string | null;
    link: AppLinkProps;
    img: {
        url: string;
        alt: string;
    }
}