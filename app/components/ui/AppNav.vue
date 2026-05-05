<template>
    <nav :class="['nav', sizeClass]">
        <ul class="nav__list">
            <li class="nav__item" v-for="route in routes" :key="route.name">
                <NuxtLink class="nav__link" :to="route.to">
                    <app-svg :icon="route.name" class="nav__icon" v-if="icons" />
                    {{ capitalize ? toCapitalize(route.title) : route.title }}
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import toCapitalize from '~/utils/capitalize';
import type { TRoutes } from '~~/types/routeLinks.type';
const { capitalize = false, size } = defineProps<{
    routes: TRoutes,
    capitalize?: boolean,
    icons: boolean,
    size?: 'small'
}>()
const sizeClass = computed(() => {
    return 'nav--' + size
})
</script>

<style scoped lang="scss">
.nav {
    &__list {
        display: flex;
        gap: 20px;
    }

    &__link {
        display: flex;
        align-items: center;
        gap: 5px;
        color: var(--text-1);
        font-size: 1.6rem;

        cursor: pointer;
        transition: color linear .1s;

        &:hover {
            color: var(--hover);

            .nav__icon {
                fill: var(--hover);
            }
        }
    }

    &__icon {
        height: 25px;
        width: auto;
        transition: fill linear .1s;
    }

    &--small {
        .nav__list {
            gap: 10px;
        }

        .nav__link {
            font-size: 1.4rem;
        }
    }
}
</style>