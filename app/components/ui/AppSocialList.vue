<template>
    <div class="social">
        <ul class="social__list">
            <li class="social__item" v-for="social in socialRoutes" :key="social.name">
                <a :href="social.to" class="social__link" :aria-label="'Перейти в ' + social.name"
                    rel="noopener noreferrer">
                    <app-svg :icon="social.name" class="social__icon" />
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
export type TSocials = {
    to: string,
    name: string
}[]
const props = defineProps<{
    socialRoutes: TSocials,
}>()
</script>

<style scoped lang="scss">
.social {
    &__list {
        display: flex;
        gap: 10px;
    }

    &__link {
        &:hover {
            .social__icon {
                fill: var(--text-1);
            }
        }
    }

    &__icon {
        width: 23px;
        fill: var(--ui-1);

    }
}
</style>