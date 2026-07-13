<template>
  <div class="carousel">
    <div class="carousel__slider-holder">
      <app-slider
        v-if="data.banners.length > 0"
        :items="data.banners"
        :autoplay="true"
        :dots="true"
      >
        <template #slide="{ item }">
          <app-banner
            :href="item.link.href"
            :is-external="item.link.isExternal"
            :img="item.img.url"
            :alt="item.img.alt"
            class="carousel__banner"
          />
        </template>
      </app-slider>
      <app-placeholder v-else />
    </div>
    <div class="carousel__block-holder">
      <h2 class="carousel__title">{{ data.title }}</h2>
      <div class="carousel__text">
        <p>{{ data.content }}</p>
      </div>

      <app-link
        :href="data.sectionLink.href"
        :is-external="data.sectionLink.isExternal"
        class="carousel__btn"
      >
        Перейти
      </app-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CarouselSectionModel } from './types';

defineProps<{
  data: CarouselSectionModel;
}>();
</script>

<style scoped lang="scss">
.carousel {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 30px;

  &__slider-holder {
    flex: 2;

    min-width: 0;
  }

  &__banner {
    width: 100%;
    height: 100%;
    border-radius: var(--b-r);
  }

  &__block-holder {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
  }

  &__title {
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: 0.05em;
  }

  &__text {
    font-size: 1.6rem;
    line-height: 20px;
    letter-spacing: 0.2em;
    text-align: justify;
  }

  &__btn {
    padding: 15px;
    background-color: var(--pink);
    border-radius: var(--b-r);
    transition: background linear var(--t-1);
    font-weight: 500;

    &:hover {
      background-color: var(--accent);
    }
  }
}

@include device(md) {
  .carousel {
    flex-direction: column;
    align-items: stretch;
    &__block-holder {
      gap: 20px;
    }
  }
}
</style>
