<template>
  <div class="about-template">
    <app-sidebar class="about-template__sidebar">
      <app-nav
        :routes="ABOUT_ROUTES"
        :capitalize="true"
        :icons="false"
        variant="page"
      />
    </app-sidebar>
    <div class="about-template__content">
      <app-page-title
        v-if="title"
        class="about-template__title"
      >
        {{ title }}
      </app-page-title>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ABOUT_ROUTES } from '~/constants/routes/aboutRoutes';

defineProps<{
  title?: string;
}>();
</script>

<style scoped lang="scss">
.about-template {
  display: flex;
  gap: 20px;

  &__content {
    flex: 1;
    min-width: 0;
  }

  &__title {
    margin-bottom: 30px;
  }
}
@include device('md') {
  .about-template {
    &__sidebar {
      display: none;
    }
  }
}
</style>
