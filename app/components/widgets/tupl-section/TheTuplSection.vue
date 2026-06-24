<template>
  <app-section class="tupl-section">
    <div class="tupl-section__content-holder">
      <div class="tupl-section__content-block">
        <app-svg
          icon="smartphone"
          class="tupl-section__icon"
        />
        <app-text-block>
          <template #title>Apple iphone 17 pro </template>
          <template #text>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae ratione est ut dolor, culpa omnis temporibus,
            consectetur in vitae doloribus id obcaecati velit soluta corporis dolorem provident et debitis delectus.
            Ratione assumenda dignissimos earum delectus iste fugiat reprehenderit sit obcaecati, tenetur maxime
            deserunt vel dolor non, eum magnam. Modi, quas.
          </template>
        </app-text-block>
      </div>
      <app-banner
        img="/mocked/iPhone-17-Pro-Camera-Setup-PNG.png"

      />
    </div>
    <div class="tupl-section__banner-holder">
      <app-banner
        img="/mocked/iPhone-17-Pro-PNG.png"
        fit="contain"
      />
    </div>
  </app-section>
</template>

<style scoped lang="scss">
.tupl-section {
  display: flex;
  max-height: 500px;

  &__banner-holder {
    flex: 2;
  }
  &__content-holder {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
  &__icon {
    width: 45px;
    fill: var(--pink);
  }
  &__content-block {
    width: 100%;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
  &__content-title {
    text-align: center;
  }
}
</style>
