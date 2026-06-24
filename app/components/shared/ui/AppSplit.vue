<template>
  <app-section :class="['split', reverse ? 'split--reverse' : undefined]">
    <div class="split__main">
      <slot name="main" />
    </div>

    <div class="split__side">
      <slot name="side" />
    </div>
  </app-section>
</template>

<script setup lang="ts">
defineProps<{
  reverse?: boolean;
}>();
</script>

<style scoped lang="scss">
.split {
  display: grid;
  outline: 1px solid red;
  gap: 30px;
  justify-items: center;
  grid-template-rows: minmax(auto, 550px);
  grid-template-columns: 2fr 1fr;

  &--reverse {
    grid-template-columns: 1fr 2fr;

    .split__main {
      order: 2;
    }

    .split__side {
      order: 1;
    }
  }
}
@include device(md) {
  .split {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr minmax(auto, 350px);
  }
}
</style>
