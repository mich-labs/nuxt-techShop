<template>
    <main class="main app-page">
        <app-container>
            <slot />
        </app-container>
    </main>
</template>

<style scoped lang="scss">
.main{
    min-height: 500px;
}
</style>