<template>
  <div class="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  border-radius: 20px 20px 0 0;

  background-color: var(--bg-1);
  -webkit-box-shadow: var(--app-shadow);
  -moz-box-shadow: var(--app-shadow);
  box-shadow: var(--app-shadow);
}
</style>