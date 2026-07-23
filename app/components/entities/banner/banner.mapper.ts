import mapLink from "~/components/shared/lib/link.mapper";
import type { BannerDto, BannerModel } from "./types";


export default function mapBanner(dto: BannerDto, mediaHost: string): BannerModel {
    const image = dto.image;
    return {
        title: dto.title,
        content: dto.content,
        link: mapLink(dto.link),
        img: {
            url: mediaHost + (image?.url ?? ''),
            alt: image?.alternativeText ?? image?.name ?? dto.title ?? '',
        }
    }
}
