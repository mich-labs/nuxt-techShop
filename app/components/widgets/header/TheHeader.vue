<template>
  <header class="header">
    <app-container>
      <div class="header__main">
        <NuxtLink
          to="/"
          style="color: inherit; text-decoration: none"
        >
          <app-brand />
        </NuxtLink>
        <div class="header__actions">
          <app-nav
            :routes="commonRoutes"
            :capitalize="true"
            :icons="true"
            class="header__nav"
          />
          <app-burger
            v-model="isMenuOpen"
            class="header__burger"
          />
        </div>
      </div>
      <div class="header__under">Каталог</div>
    </app-container>
  </header>
</template>

<script setup lang="ts">
import type { TRoutes } from '~~/types/routeLinks.type';
const isMenuOpen = ref(false);
const commonRoutes: TRoutes = [
  { name: 'cart', to: '/cart', title: 'корзина' },
  { name: 'bookmarks', to: '/bookmarks', title: 'закладки' },
  { name: 'profile', to: '/profile', title: 'профиль' },
];
</script>

<style scoped lang="scss">
.header {
  width: 100%;
  position: sticky;
  top: 0;
  z-index: var(--z-max);
  background-color: var(--bg-1);
  padding: 15px 0;

  &__burger {
    display: none;
  }
  &__main {
    display: flex;
    justify-content: space-between;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--ui-1);
  }
  &__actions {
    display: flex;
    align-items: center;
    gap: 20px;
  }
  &__under {
    padding-top: 15px;
  }
}
@include device('sm') {
  .header {
    padding: 5px;
    &__main {
      border: none;
      padding-bottom: 0;
    }
    &__under {
      display: none;
    }
    &__burger {
      display: flex;
    }
  }
}
</style>
