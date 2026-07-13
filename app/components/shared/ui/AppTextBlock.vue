<template>
  <div :class="['text-block', `text-block--align-${align}`]">
    <h2
      v-if="$slots.title"
      class="text-block__title"
    >
      <slot name="title" />
    </h2>
    <div class="text-block__content">
      <slot name="text" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { align = 'justify' } = defineProps<{
  align?: 'center' | 'justify';
}>();
</script>

<style scoped lang="scss">
.text-block {
  &__title {
    font-size: 2rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 20px;
  }

  &__content {
    font-size: 1.6rem;
    line-height: 20px;
    letter-spacing: -0.02em;
  }

  &--align-center &__content,
  &--align-center &__title {
    text-align: center;
  }

  &--align-justify &__content {
    text-align: justify;
  }

  :deep(p:not(:last-child)) {
    margin-bottom: 10px;
  }
}
</style>
