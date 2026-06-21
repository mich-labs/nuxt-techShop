<template>
  <div class="loader">
    <div class="spinner" />
  </div>
</template>
<style lang="scss">
.loader {
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   --z-index: var(5);

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--bg-1);
}

.spinner {
  width: 100px;
  height: 100px;
  position: relative;
  border-radius: 50%;

  animation: spin 2s linear infinite;

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 5px solid transparent;
    background-origin: border-box;
    background-clip: padding-box, border-box;
  }

  &::before {
    background-image:
      linear-gradient(var(--bg-1), var(--bg-1)), linear-gradient(45deg, var(--dark-red) 25%, var(--pink));
  }

  &::after {
    background-image: linear-gradient(var(--bg-1), var(--bg-1)), linear-gradient(45deg, var(--pink), var(--sky) 60%);
    animation: morph-gradient 2s ease-in-out infinite alternate;
  }
}

@keyframes spin {
  to {
    transform: rotate(1turn);
  }
}

@keyframes morph-gradient {
  0%,
  20% {
    opacity: 0;
  }

  80%,
  100% {
    opacity: 1;
  }
}
</style>
