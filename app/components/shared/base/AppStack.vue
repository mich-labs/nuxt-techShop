<template>
    <component :is="el" class="app-stack" :style="style">
        <slot />
    </component>
</template>

<script setup lang="ts">
import type { TJustifyContent, TStackAlign, TStackDirection } from '~~/types/components/stack.types'
const {
    el = 'div',
    gap = 10,
    direction = 'row',
    alignItems = 'normal',
    justify = 'normal'
} = defineProps<{
    el?: 'ul' | 'div'
    gap?: number;
    direction?: TStackDirection;
    alignItems?: TStackAlign;
    justify?: TJustifyContent;
}>();

const style = computed(() => {
    return {
        flexDirection: direction,
        gap: gap + 'px',
        alignItems: alignItems,
        justifyContent: justify
    };
})
</script>

<style lang="scss" scoped>
.app-stack {
    display: flex;
}
</style>