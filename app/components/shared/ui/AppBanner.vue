<template>
  <app-link
    :href="href"
    :is-external="isExternal"
    class="banner"
  >
    <slot name="content" />
    <NuxtImg
      v-if="img"
      :src="img"
      :alt="alt || ''"
      :class="['banner__img', $slots.content ? 'banner__img--abs' : undefined, `banner__img--${fit}`]"
      format="webp"
    />
  </app-link>
</template>

<script setup lang="ts">
export interface AppBannerProps {
  href: string;
  isExternal?: boolean;
  img: string;
  alt?: string;
  fit?: 'cover' | 'contain';
}

const { fit = 'cover', isExternal = false } = defineProps<AppBannerProps>();
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
