<template>
    <main class="main app-page">
        <app-container>
            <slot />
        </app-container>
    </main>
</template>

<style scoped lang="scss">
.main {
    padding-top: 50px;
    min-height: 500px;
}
</style>