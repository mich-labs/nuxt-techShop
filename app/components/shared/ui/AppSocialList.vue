<template>
  <div class="social">
    <ul class="social__list">
      <li
        v-for="social in socialRoutes"
        :key="social.name"
        class="social__item"
      >
        <app-link
          :href="social.to"
          :is-external="true"
          class="social__link"
          :aria-label="'Перейти в ' + social.name"
        >
          <app-svg
            :icon="social.name"
            class="social__icon"
          />
        </app-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
export type TSocials = {
  to: string;
  name: string;
}[];

defineProps<{
  socialRoutes: TSocials;
}>();
</script>

<style scoped lang="scss">
.social {
  &__list {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  &__link {
    &:hover {
      .social__icon {
        --svg-fill: var(--accent);
      }
    }
  }

  &__icon {
    --svg-width: 23px;
    --svg-fill: var(--ui-1);
  }
}
</style>
