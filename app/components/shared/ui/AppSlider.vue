<template>
  <div class="embla__wrapper">
    <div
      ref="emblaRef"
      class="embla"
    >
      <div class="embla__container">
        <div
          v-for="(item, idx) in items"
          :key="idx"
          class="embla__slide"
        >
          <slot
            name="slide"
            :item="item"
            :index="idx"
          />
        </div>
      </div>
    </div>

    <div
      v-if="scrollSnaps.length > 1 && dots"
      class="embla__dots"
    >
      <div
        v-for="(_, index) in scrollSnaps"
        :key="index"
        :class="['embla__dot', index === selectedSnap ? 'embla__dot--active' : '']"
        @click="scrollTo(index)"
      />
    </div>
  </div>
</template>

<script setup lang="ts" generic="T">
import emblaCarouselVue from 'embla-carousel-vue';
import type { EmblaCarouselType } from 'embla-carousel';
import Autoplay from 'embla-carousel-autoplay';

const { autoplay = false, dots = false } = defineProps<{
  items: T[];
  autoplay?: boolean;
  dots?: boolean;
}>();

const [emblaRef, emblaApi] = emblaCarouselVue(
  {
    loop: true,
    align: 'center',
  },
  [
    Autoplay({
      active: autoplay,
    }),
  ],
);

const scrollSnaps = ref<number[]>([]);
const selectedSnap = ref(0);

const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);
const setupSnaps = (api: EmblaCarouselType) => (scrollSnaps.value = api.scrollSnapList());
const setActiveSnap = (api: EmblaCarouselType) => (selectedSnap.value = api.selectedScrollSnap());

watch(
  emblaApi,
  (api) => {
    if (!api) return;

    if (autoplay) {
      api.plugins().autoplay?.play();
    }
    setupSnaps(api);
    setActiveSnap(api);

    api.on('reInit', setupSnaps);
    api.on('reInit', setActiveSnap);
    api.on('select', setActiveSnap);
  },
  { immediate: true },
);

onUnmounted(() => {
  const api = emblaApi.value;
  if (!api) return;

  api.off('reInit', setupSnaps);
  api.off('reInit', setActiveSnap);
  api.off('select', setActiveSnap);
  api.plugins().autoplay?.stop();
});
</script>

<style scoped lang="scss">
.embla {
  overflow: hidden;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__container {
    display: flex;
    width: 100%;
    gap: 20px;
  }

  &__slide {
    min-width: 0;
    max-height: 450px;
    aspect-ratio: 2/1;
    flex: 0 0 100%;

    overflow: hidden;
    border-radius: var(--b-r);
  }

  &__dots {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
  }

  &__dot {
    padding: 5px;
    background: var(--ui-1);
    border: none;
    border-radius: 50%;

    cursor: pointer;
    transition: outline linear var(--t-2);

    &--active {
      background: var(--accent);
    }
  }
}
</style>
