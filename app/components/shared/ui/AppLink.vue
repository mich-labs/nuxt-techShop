<template>
    <component 
    :is="element"
    :to="to"
    :href="href"
    :target="isExternal ? '_blank': undefined"
    :rel="isExternal? 'noopener noreferrer': undefined"
    class='app-link'
    >
        <slot />
    </component>
</template>
<script setup lang="ts">

const props = defineProps<{
    to?: string;
    href?: string;
}>();
const isExternal = computed(() => !!props.href);
const element = computed(() => {
    if (props.to) return resolveComponent('NuxtLink');
    return 'a';
})
</script>

<style scoped lang="scss">
.app-link{
    cursor: pointer;
}
</style>