<template>
    <div class="info">
        <h2 class="info__title">
            <slot name="title" mdc-unwrap="p" />
        </h2>
        <ul class="info__list">
            <slot name="items" mdc-unwrap="ul" />
        </ul>
    </div>
</template>

<style scoped lang="scss">
.info {
    display: flex;
    flex-direction: column;
    gap: 20px;

    &__title {
        font-size: 2rem;
        font-weight: 500;
        letter-spacing: .05em;
    }

    &__list {
        font-size: 1.6rem;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-left: 26px;
        letter-spacing: .05em;

        li {
            list-style-type: disc;

        }
    }
}
</style>