<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <app-404 v-if="error.status === 404" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();
</script>

<style scoped lang="scss">
.app-wrapper {
  border-radius: 20px 20px 0 0;

  background-color: var(--bg-1);
  -webkit-box-shadow: var(--app-shadow);
  -moz-box-shadow: var(--app-shadow);
  box-shadow: var(--app-shadow);
}
</style>
