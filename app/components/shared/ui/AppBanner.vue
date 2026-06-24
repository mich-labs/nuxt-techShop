<template>
  <app-link
    :to="to"
    :href="href"
    class="banner"
  >
    <slot name="content" />
    <NuxtImg
      v-if="img"
      :src="img"
      format="webp"
      :class="['banner__img', $slots.content ? 'banner__img--abs' : undefined]"
      :alt="img ? alt : undefined"
    />
  </app-link>
</template>

<script setup lang="ts">
defineProps<{
  to?: string;
  href?: string;
  img: string;
  alt?: string;
}>();
</script>

<style scoped lang="scss">
.banner {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    &--abs {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
}
</style>
