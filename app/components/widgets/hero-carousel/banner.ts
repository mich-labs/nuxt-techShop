import type { IHeroBanner } from "./types";
import type { IRecordBanner } from "~~/types/records/banner.record"

export async function fetchHeroBanners() {
    return await useFetch('/api/mocked/banners', {
        key: 'hero-banners',
        transform: (data: IRecordBanner[]) => data.map(bannerDTO),
        default: () => []
    })
}

const bannerDTO = (rawRecord: IRecordBanner): IHeroBanner => ({
    href: rawRecord.link,
    img: rawRecord.imgPath,
    alt: rawRecord.title || rawRecord.title || 'alt'
})