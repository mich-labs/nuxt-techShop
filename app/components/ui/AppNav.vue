<template>
    <nav :class="['nav', sizeClass, variantClass]">
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
const { capitalize = false, size, variant } = defineProps<{
    routes: TRoutes,
    capitalize?: boolean,
    icons: boolean,
    size?: 'small',
    variant?: 'page'
}>()
const sizeClass = computed(() => {
    return size ? 'nav--' + size : ''

})
const variantClass = computed(() => {
    return variant ? 'nav--variant-' + variant : ''
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
    }

    &--small {
        .nav__list {
            gap: 10px;
        }

        .nav__link {
            font-size: 1.4rem;
        }
    }

    &--variant-page {
        width: 100%;
        background-color: var(--bg-2);
        border-radius: var(--b-r);
        padding: 10px;

        .nav {

            &__list {
                flex-direction: column;
                gap: 0;
            }

            &__item {
                &:last-child {
                    .nav__link {
                        border-bottom: none;
                        border-bottom-left-radius: calc(var(--b-r)/2);
                        border-bottom-right-radius: calc(var(--b-r)/2);
                    }
                }

                &:first-child {
                    .nav__link {
                        border-top-left-radius: calc(var(--b-r)/2);
                        border-top-right-radius: calc(var(--b-r)/2);
                    }
                }
            }

            &__link {
                padding: 15px 10px;
                border-bottom: 1px solid var(--ui-1);
                transition: background-color linear .1s;

                &:hover {
                    background-color: var(--ui-3);
                }
            }
        }
    }
}
</style>