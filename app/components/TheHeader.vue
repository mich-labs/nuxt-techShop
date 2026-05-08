<template>
    <header class="header">
        <app-container>
            <div class="header__main">
                <app-stack justify="space-between" align-items="center">
                    <NuxtLink to="/" style="color: inherit; text-decoration: none;">
                        <app-brand />
                    </NuxtLink>
                    <app-nav :routes="commonRoutes" :capitalize="true" :icons="true" />
                </app-stack>
            </div>
            <div class="header__under">Каталог</div>
        </app-container>
    </header>
</template>
<script setup lang="ts">
import type { TRoutes } from '~~/types/routeLinks.type';

const commonRoutes: TRoutes = [
    { name: 'cart', to: '/cart', title: 'корзина' },
    { name: 'bookmarks', to: '/bookmarks', title: 'закладки' },
    { name: 'profile', to: '/profile', title: 'профиль' },
]
</script>
<style scoped lang="scss">
.header {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: var(--z-max);
    background-color: var(--bg-1);
    padding: 25px 0;

    &__main {
        padding-bottom: 25px;
        border-bottom: 1px solid var(--ui-1);
    }

    &__under {
        padding-top: 25px;

    }
}
</style>