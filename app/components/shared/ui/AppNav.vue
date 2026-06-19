<template>
    <nav :class="['nav', sizeClass, variantClass]">
        <ul class="nav__list">
            <li v-for="route in routes" :key="route.name" class="nav__item">
                <NuxtLink class="nav__link" :to="route.to">
                    <app-svg v-if="icons" :icon="route.name" class="nav__icon" />
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
        transition: color linear var(--t-2);

        &:hover {
            color: var(--accent);

            .nav__icon {
                fill: var(--accent);
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

    .router-link-exact-active {
        color: var(--accent);
    }

    &--variant-page {
        width: 100%;
        background-color: var(--bg-2);
        border-radius: var(--b-r);
        padding: 10px;


        .router-link-exact-active {
            background-color: var(--ui-3);
            color: var(--accent);
        }

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
                transition: background-color linear var(--t-2),
                    color linear var(--t-2);

                &:hover {
                    background-color: var(--ui-3);
                }
            }
        }
    }
}
</style>