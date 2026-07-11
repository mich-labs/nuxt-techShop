<template>
  <app-split :reverse="reverse">
    <template #main>
      <app-banner
        :img="data.mainImg.url"
        :href="data.link.href"
        :alt="data.mainImg.alt"
        :is-external="data.link.isExternal"
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
            <template #title>{{ data.title }}</template>
            <template #text>
              {{ data.content }}
            </template>
          </app-text-block>
        </div>

        <app-banner
          :img="data.smallImg.url"
          :alt="data.smallImg.alt"
          :href="data.link.href"
          :is-external="data.link.isExternal"
          fit="contain"
        />
      </div>
    </template>
  </app-split>
</template>
<script setup lang="ts">
import type { PromoSectionModel } from './types';

const { reverse = false } = defineProps<{
  reverse?: boolean;
  data: PromoSectionModel;
}>();
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
    height: auto;
    grid-template-rows: auto auto;
    gap: 30px;
  }
}
</style>
