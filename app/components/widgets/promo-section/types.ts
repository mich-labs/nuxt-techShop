import type { AppLinkProps } from '~/components/shared/ui/AppLink.vue';
import type { WidgetsPromoSekcziyaGetPayload } from '~~/cms';


export type PromoSectionDto = WidgetsPromoSekcziyaGetPayload<{
  populate: '*';
}>

export interface PromoSectionModel {
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
