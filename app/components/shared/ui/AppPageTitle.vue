<template>
    <h1 class="page__title">
        <slot />
    </h1>
</template>

<style scoped lang="scss">
.page {
    &__title {
        font-size: 4.2rem;
        color: var(--text-2);
        letter-spacing: .05em;
        font-weight: 700;
    }
}
</style>