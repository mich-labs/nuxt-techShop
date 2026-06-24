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
      :class="['banner__img', $slots.content ? 'banner__img--abs' : undefined, `banner__img--${fit}`]"
      :alt="img ? alt : ''"
    />
  </app-link>
</template>

<script setup lang="ts">
const { fit = 'cover' } = defineProps<{
  to?: string;
  href?: string;
  img: string;
  alt?: string;
  fit?: 'cover' | 'contain';
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

    &--contain {
      object-fit: contain;
    }
    &--cover {
      object-fit: cover;
    }
    &--abs {
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
}
</style>
