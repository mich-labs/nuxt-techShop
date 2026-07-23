<template>
  <about-template :title="data.title">
    <section
      v-for="(block, i) in data.content"
      :key="i"
      class="about-content__block"
    >
      <h2
        v-if="block.title"
        class="about-content__block-title"
      >
        {{ block.title }}
      </h2>
      <app-blocks-renderer :nodes="block.content" />
    </section>
  </about-template>
</template>

<script setup lang="ts">
const data = await useAboutPage('about-index', (cms) => cms.oNas.find({ populate: '*' }));

useSeoMeta({
  title: data.seo.title,
  description: data.seo.description,
});
</script>

<style scoped lang="scss">
.about-content {
  &__block {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
  }

  &__block-title {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }
}
</style>
