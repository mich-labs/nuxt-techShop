<template>
    <div class="page__title">
        <slot />
    </div>
</template>

<style scoped lang="scss">
.page {
    &__title {
        font-size: 4.2rem;
        color: var(--text-2);
        letter-spacing: .05em;
        font-weight: 700;
        margin-bottom: 50px;
    }
}
</style>