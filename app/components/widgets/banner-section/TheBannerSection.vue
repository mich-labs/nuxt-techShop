<template>
  <app-split :reverse="reverse">
    <template #main>
      <app-banner
        img="/mocked/iPhone-17-Pro-PNG.png"
        fit="contain"
      />
    </template>

    <template #side>
      <div class="side">
        <div class="side__content">
          <app-svg
            icon="smartphone"
            class="side__svg"
          />
          <app-text-block align="center">
            <template #title>Apple iphone 17 pro</template>
            <template #text>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias ipsum cupiditate perspiciatis!
              Quisquam explicabo rerum animi, excepturi nulla velit, neque nesciunt culpa beatae minus sapiente sint
              omnis voluptates corporis debitis! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias
              ipsum cupiditate perspiciatis! Quisquam explicabo rerum animi, excepturi nulla velit, neque nesciunt culpa
              beatae minus sapiente sint omnis voluptates corporis debitis!
            </template>
          </app-text-block>
        </div>

        <app-banner
          img="/mocked/iPhone-17-Pro-Camera-Setup-PNG.png"
          fit="contain"
        />
      </div>
    </template>
  </app-split>
</template>
<script setup lang="ts">
defineProps<{
  reverse?: boolean;
}>();
</script>
<style scoped lang="scss">
.side {
  display: grid;
  height: 100%;
  grid-template-rows: minmax(auto, 300px) minmax(auto, 200px);
  gap: 50px;
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  &__svg {
    fill: var(--pink);
    width: 45px;
  }
  &__text {
    text-align: center;
  }
}
@include device(md) {
  .side {
    grid-template-rows: auto minmax(auto, 200px);
  }
}
</style>
