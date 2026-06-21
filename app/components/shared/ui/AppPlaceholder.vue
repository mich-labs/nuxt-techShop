<template>
  <div class="placeholder">
    <logo />
    <app-page-title>Tech Shop</app-page-title>
    <p>Технологии. Эстетика. Комфорт.</p>
  </div>
</template>
<style scoped lang="scss">
.placeholder {
  width: 100%;
  height: 100%;
  padding: 50px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  background: var(--ui-3);
  border-radius: var(--b-r);
  transition: background linear var(--t-3);
  p {
    letter-spacing: 0.2em;
  }
  &:hover {
    background: var(--bg-gradient-2);
  }
}
</style>
