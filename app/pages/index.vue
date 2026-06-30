<template>
  <app-stack
    direction="column"
    :gap="100"
  >
    <the-hero-carousel />
    <the-banner-section :reverse="true" />
  </app-stack>
</template>
<script setup lang="ts">
import type {
  Glavnaya,
  GlavnayaPopulateParam,
  SharedBanner,
  SharedBannerGetPayload,
  SharedBannerPopulateParam,
  SharedTekstovyjBlokDz,
  WidgetsBannerSekcziya,
  WidgetsBannerSekcziyaPopulateParam,
} from '~~/cms';

const { $cms } = useNuxtApp();

const { data } = useAsyncData('home', async () => {
  return await $cms.glavnaya.find({
    populate: {
      bannerSection1: {
        populate: '*',
      },
      bannerSection2: {
        populate: '*',
      },
      slider: {
        populate: {
          banner: {
            populate: '*',
          },
          button: true,
        },
      },
      seo: true,
    },
  });
});
useSeoMeta({
  title: data.value?.seo?.title,
  description: data.value?.seo?.description,
});
const test1231 = data.value?.bannerSection1;
type test = typeof data.value;
interface Itest {
  test1: WidgetsBannerSekcziya & WidgetsBannerSekcziyaPopulateParam;
  test2: Glavnaya & GlavnayaPopulateParam;
}
console.log('data', data.value);
</script>
