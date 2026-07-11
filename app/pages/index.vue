<template>
  <app-stack
    direction="column"
    :gap="100"
  >
    <the-hero-carousel
      v-if="data.carouselData"
      :data="data.carouselData"
    />
    <the-promo-section
      v-if="data.promoSection1"
      :data="data.promoSection1"
      :reverse="true"
    />
    <the-promo-section
      v-if="data.promoSection2"
      :data="data.promoSection2"
    />
  </app-stack>
</template>
<script setup lang="ts">
const data = await useHomePage();

useSeoMeta({
  title: data.seo.title,
  description: data.seo.description,
});
</script>
