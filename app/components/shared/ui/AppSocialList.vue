<template>
    <div class="social">
        <ul class="social__list">
            <li  v-for="social in socialRoutes" :key="social.name" class="social__item">
                <app-link
                :href="social.to" 
                class="social__link" 
                :aria-label="'Перейти в ' + social.name">
                    <app-svg :icon="social.name" class="social__icon" />
                </app-link>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
export type TSocials = {
    to: string,
    name: string
}[]

defineProps<{
    socialRoutes: TSocials,
}>()
</script>

<style scoped lang="scss">
.social {
    &__list {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    &__link {
        transition: fill linear var(--t-2);
        &:hover {
            .social__icon {
                fill: var(--accent);
            }
        }
    }

    &__icon {
        width: 23px;
        fill: var(--ui-1);

    }
}
</style>