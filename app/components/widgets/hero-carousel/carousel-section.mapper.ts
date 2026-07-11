import { mapBanner, type BannerModel } from "~/components/entities/banner";
import type { CarouselSectionDto, CarouselSectionModel } from "./types";
import mapLink from "~/components/shared/lib/link.mapper";


export default function mapCarouselSection(dto: CarouselSectionDto, mediaHost: string): CarouselSectionModel {
    let banners: BannerModel[] = []
    if (dto.banners) {
        banners = dto.banners.map(banner => mapBanner(banner, mediaHost))
    }
    return {
        title: dto.title,
        content: dto.content,
        sectionLink: mapLink(dto.button),
        banners
    }
}