<template>
  <component
    :is="element"
    :[attrName]="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
    class="app-link"
  >
    <slot />
  </component>
</template>
<script setup lang="ts">
export interface AppLinkProps {
  href: string;
  isExternal?: boolean;
}
const { isExternal = false } = defineProps<AppLinkProps>();
const element = computed(() => (isExternal ? 'a' : resolveComponent('NuxtLink')));
const attrName = computed(() => (isExternal ? 'href' : 'to'));
</script>

<style scoped lang="scss">
.app-link {
  cursor: pointer;
  text-decoration: none;
  color: inherit;
}
</style>
