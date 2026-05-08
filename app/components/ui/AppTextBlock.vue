<template>
    <div class="text-block">
        <h2 class="text-block__title" v-if="$slots.title">
            <slot name="title" mdc-unwrap="p" />
        </h2>

        <slot name="text" />
    </div>
</template>

<style scoped lang="scss">
.text-block {
    font-size: 1.6rem;
    text-align: justify;
    line-height: 20px;
    letter-spacing: -.02em;

    &__title {
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: .05em;
        margin-bottom: 20px;
    }

    :deep(p:not(:last-child)) {
        margin-bottom: 10px;
    }
}
</style>