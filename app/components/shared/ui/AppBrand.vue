<template>
  <div class="brand">
    <logo class="brand__logo" />
    <h1 class="brand__title">Nuxtie</h1>
  </div>
</template>
<style scoped lang="scss">
.brand {
  display: flex;
  gap: 10px;
  align-items: center;

  &__title {
    font-size: 2.5rem;
    line-height: 1.2;
    text-transform: uppercase;
  }
}
@include device('xs') {
  .brand {
    &__logo{
      width: 50px;
      height: 50px;
    }
    &__title {
      font-size: 2rem;
    }
  }
}
</style>
