<template>
    <div class="sidebar__wrapper">
        <aside class="sidebar">
            <slot />
        </aside>
    </div>
</template>

<script setup lang="ts">

</script>
<style scoped lang="scss">
.sidebar {
    width: 100%;
    padding: 0 10px;

    position: sticky;
    top: 215px;
    display: flex;
    gap: 20px;

    &__wrapper {
        width: 100%;
        max-width: 300px;
    }

}
</style>