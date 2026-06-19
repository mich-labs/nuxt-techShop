<template>
    <svg class="svg">
        <use :xlink:href="'/sprite.svg#' + icon" />
    </svg>
</template>
<script setup lang="ts">
defineProps<{
    icon: string;
}>();
</script>
<style scoped lang="scss">
.svg {
    width: 30px;
    aspect-ratio: 1/1;
    fill: var(--text-1);
    transition: fill linear var(--t-2);
}
</style>