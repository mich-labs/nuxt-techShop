<template>
  <div class="text-block">
    <h2
      v-if="$slots.title"
      class="text-block__title"
    >
      <slot
        name="title"
        mdc-unwrap="p"
      />
    </h2>
    <div class="text-block__content">
      <slot name="text" />
    </div>
  </div>
</template>

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
    text-align: justify;
    line-height: 20px;
    letter-spacing: -0.02em;
  }

  :deep(p:not(:last-child)) {
    margin-bottom: 10px;
  }
}
</style>
