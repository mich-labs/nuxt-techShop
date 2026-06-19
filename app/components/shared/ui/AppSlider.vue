<template>
    <div class="embla__wrapper">

        <div ref="emblaRef" class="embla">
            <div class="embla__container">
                <div 
                v-for="n in 5" :key="n" class="embla__slide">
                    <div class="slide__content">Товар {{ n }}</div>
                </div>
            </div>
        </div>

        <div class="embla__dots">
            <div 
                v-for="(_, index) in scrollSnaps" :key="index" :class="[
                'embla__dot',
                index === selectedSnap ? 'embla__dot--active' : ''
            ]" @click="scrollTo(index)" />

        </div>
    </div>
</template>

<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import type { EmblaCarouselType } from 'embla-carousel'

const [emblaRef, emblaApi,] = emblaCarouselVue({
    loop: true,
    align: 'center',
})

const scrollSnaps = ref<number[]>([])
const selectedSnap = ref(0)

const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)
const setupSnaps = (emblaApi: EmblaCarouselType) => (scrollSnaps.value = emblaApi.scrollSnapList())
const setActiveSnap = (emblaApi: EmblaCarouselType) => (selectedSnap.value = emblaApi.selectedScrollSnap())

watch(
    emblaApi,
    (api) => {
        if (!api) return

        setupSnaps(api)
        setActiveSnap(api)

        api.on('reInit', setupSnaps)
        api.on('reInit', setActiveSnap)
        api.on('select', setActiveSnap)
    },
    { immediate: true }
)
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
        margin-left: -16px;
    }

    &__slide {
        min-width: 0;
        max-height: 350px;
        aspect-ratio: 1/2;
        flex: 0 0 100%;
        padding-left: 16px;
    }

    &__dots {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 5px;
    }

    &__dot {
        padding: 10px;
        background: var(--ui-1);
        border: none;
        border-radius: 50%;

        cursor: pointer;
        transition: outline linear .2s;

        &--active {
            outline: 3px solid var(--accent);
            outline-offset: -3px;

        }
    }

}

.slide__content {

    height: 100%;
    background: var(--ui-1);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: bold;
}
</style>