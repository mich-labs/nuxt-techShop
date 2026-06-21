<template>
  <div class="error-404">
    <div class="error-404__holder-404">
      <span>4</span>
      <logo />
      <span>4</span>
    </div>
    <div class="error-404__text">Упс... Ошибка 404. То что вы искали не нашлось</div>
    <app-link
      to="/"
      class="error-404__home-btn"
    >
      Домой
    </app-link>
  </div>
</template>
<style scoped lang="scss">
.error-404 {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  &__holder-404 {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    span {
      font-size: 12rem;
      font-weight: 500;
    }
  }

  &__text {
    font-size: 2rem;
  }

  &__home-btn {
    padding: 15px;
    background-color: var(--pink);
    border-radius: var(--b-r);
    transition: background linear var(--t-1);
    font-weight: 500;

    &:hover {
      background-color: var(--accent);
    }
  }
}
</style>
