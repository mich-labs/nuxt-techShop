import type { AboutPageBlockModel, AboutPageDto, AboutPageModel } from './types';
import { DEFAULT_SEO } from '~/components/shared/lib/seo/defaultSeo';

export default function mapAboutPage(dto: AboutPageDto): AboutPageModel {
  return {
    title: dto.title,
    seo: {
      title: dto.seo?.title || DEFAULT_SEO.title,
      description: dto.seo?.description || DEFAULT_SEO.description,
    },
    content: (dto.content ?? []).map(
      (block): AboutPageBlockModel => ({
        title: block.title,
        content: block.content,
      }),
    ),
  };
}
