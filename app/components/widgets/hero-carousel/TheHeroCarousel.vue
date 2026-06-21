<template>
  <div class="carousel">
    <div class="carousel__slider-holder">
      <app-slider
        v-if="data.length > 0"
        :items="data"
        :autoplay="true"
        :dots="true"
      >
        <template #slide="{ item }">
          <app-banner
            :to="item.href"
            :img="item.img"
            :alt="item.alt"
            class="carousel__banner"
          />
        </template>
      </app-slider>
      <app-placeholder v-else />
    </div>
    <div class="carousel__block-holder">
      <app-page-title> Технологии. Эстетика. Комфорт. </app-page-title>
      <app-text-block style="letter-spacing: 0.2em">
        <template #text>
          <p>Листайте и выбирайте оригинальную технику с официальной гарантией.</p>
        </template>
      </app-text-block>

      <app-link
        to="/products"
        class="carousel__btn"
      >
        Перейти
      </app-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fetchHeroBanners } from './banner';

const { data, status } = await fetchHeroBanners();

console.log('statuslog', status.value);
</script>

<style scoped lang="scss">
.carousel {
  display: flex;
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
</style>
