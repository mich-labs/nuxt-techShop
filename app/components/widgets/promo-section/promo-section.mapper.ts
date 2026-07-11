import mapLink from '~/components/shared/lib/link.mapper';
import type { PromoSectionDto, PromoSectionModel } from './types';


export default function mapBannerSection(dto: PromoSectionDto, mediaHost: string): PromoSectionModel {

  return {
    title: dto.title,
    content: dto.content,
    link: mapLink(dto.link),
    mainImg: {
      url: mediaHost + dto.mainImage?.url,
      alt: dto.mainImage?.alternativeText || dto.title,
    },
    smallImg: {
      url: mediaHost + dto.smallImage?.url,
      alt: dto.smallImage?.alternativeText || dto.title,
    },
  };
}
