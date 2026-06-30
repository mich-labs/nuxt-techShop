import type { WidgetsBannerSekcziyaGetPayload } from '~~/cms';
import type { BannerSectionModel } from './types';

export function mapBannerSection(
  data: WidgetsBannerSekcziyaGetPayload<{
    populate: '*';
  }>,
): BannerSectionModel {
  return {
    title: data.title,
    content: data.content,
    link: {
      href: data.link?.url || '/',
      isExternal: data.link?.isExternal,
    },
    mainImg: {
      url: data.mainImage?.url || '',
      alt: data.mainImage?.alternativeText || data.title,
    },
    smallImg: {
      url: data.smallImage?.url || '',
      alt: data.smallImage?.alternativeText || data.title,
    },
  };
}
