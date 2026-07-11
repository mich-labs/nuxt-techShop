import mapLink from "~/components/shared/lib/link.mapper";
import type { BannerDto, BannerModel } from "./types";


export default function mapBanner(dto: BannerDto, mediaHost: string): BannerModel {
    return {
        title: dto.title,
        content: dto.content,
        link: mapLink(dto.link),
        img: {
            url: mediaHost + dto.image?.url,
            alt: mediaHost + dto.image?.alternativeText
        }
    }
}