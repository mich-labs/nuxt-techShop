import type { AppLinkProps } from '~/components/shared/ui/AppLink.vue';

export interface BannerSectionModel {
  title: string;
  content: string;
  link: AppLinkProps;
  mainImg: {
    url: string;
    alt: string;
  };
  smallImg: {
    url: string;
    alt: string;
  };
}
