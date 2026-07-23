import { mapAboutPage } from '~/components/entities/about-page';
import type { AboutPageModel } from '~/components/entities/about-page';
import type { StrapiClient } from '~~/cms';

/**
 * Тип данных, принимаемых mapper'ом, извлечённый без утекания DTO-имени наружу слайса.
 */
type AboutPageData = Parameters<typeof mapAboutPage>[0];

type AboutFetcher = (cms: StrapiClient) => Promise<AboutPageData>;

export default async function useAboutPage(key: string, fetcher: AboutFetcher): Promise<AboutPageModel> {
  const { $cms } = useNuxtApp();
  const { data, error } = await useAsyncData(key, () => fetcher($cms));

  if (error.value || !data.value) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Не удалось загрузить страницу',
      fatal: true,
    });
  }

  return mapAboutPage(data.value);
}
