<template>
    <ContentRenderer v-if="content" :value="content" class="mdc-content" />
</template>

<script setup lang="ts">
import type { ContentCollectionItem } from '@nuxt/content';

defineProps<{
    content: ContentCollectionItem | null | undefined
}>()
</script>

<style scoped lang="scss">
.mdc-content {
    display: flex;
    flex-direction: column;
    gap: 40px;
}
</style>