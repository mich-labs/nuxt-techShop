<template>
  <app-split :reverse="reverse">
    <template #main>
      <app-banner
        :img="mainImg.url"
        :href="link.href"
        :alt="mainImg.alt"
        :is-external="link.isExternal"
        fit="contain"
      />
    </template>

    <template #side>
      <div class="side">
        <div class="side__content">
          <app-svg
            icon="smartphone"
            class="side__svg"
          />
          <app-text-block align="center">
            <template #title>{{ title }}</template>
            <template #text>
              {{ content }}
            </template>
          </app-text-block>
        </div>

        <app-banner
          :img="smallImg.url"
          :alt="smallImg.alt"
          :href="link.href"
          :is-external="link.isExternal"
          fit="contain"
        />
      </div>
    </template>
  </app-split>
</template>
<script setup lang="ts">
import type { BannerSectionModel } from './types';

defineProps<
  {
    reverse?: boolean;
  } & BannerSectionModel
>();
</script>
<style scoped lang="scss">
.side {
  display: grid;
  height: 100%;
  grid-template-rows: minmax(auto, 300px) minmax(auto, 200px);
  gap: 50px;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  &__svg {
    fill: var(--pink);
    width: 45px;
  }
  &__text {
    text-align: center;
  }
}
@include device(md) {
  .side {
    grid-template-rows: auto minmax(auto, 200px);
  }
}
</style>
