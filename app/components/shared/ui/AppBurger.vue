<template>
  <button
    type="button"
    class="burger"
    :class="{ 'burger--active': modelValue }"
    :aria-expanded="modelValue"
    aria-label="Меню"
    @click="emit('update:modelValue', !modelValue)"
  >
    <span class="burger__line" />
    <span class="burger__line" />
    <span class="burger__line" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();
</script>

<style scoped lang="scss">
.burger {
  --size: 28px;
  --line-height: 2px;
  --gap: 6px;

  width: var(--size);
  height: var(--size);
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: var(--gap);

  &__line {
    display: block;
    width: 100%;
    height: var(--line-height);
    background-color: var(--text-1);
    border-radius: 2px;
    transition:
      transform var(--t-2) ease,
      opacity var(--t-2) ease;
    transform-origin: center;
  }

  &--active {
    .burger__line {
      &:nth-child(1) {
        transform: translateY(calc(var(--gap) + var(--line-height))) rotate(45deg);
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: translateY(calc(-1 * (var(--gap) + var(--line-height)))) rotate(-45deg);
      }
    }
  }
}
</style>
