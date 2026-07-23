<template>
  <svg
    class="svg"
    :style="{ '--svg-width-default': '30px', '--svg-fill-default': 'var(--text-1)' }"
  >
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
  width: var(--svg-width, var(--svg-width-default));
  height: var(--svg-height, auto);
  aspect-ratio: var(--svg-aspect, 1 / 1);
  fill: var(--svg-fill, var(--svg-fill-default));
  transition: fill linear var(--t-2);
}
</style>
