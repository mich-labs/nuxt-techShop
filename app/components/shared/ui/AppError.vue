<template>
  <div class="error">
    <div class="error__status-holder">
      <span>{{ firstSpan }}</span>
      <logo />
      <span>{{ content.span }}</span>
    </div>
    <div class="error__text">
      {{ content.text }}
    </div>
    <app-link to="/" class="error__home-btn">
      Домой
    </app-link>
  </div>
</template>
<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  code: NuxtError['status']
}>();

const errorContent = {
  400: {
    span: '0',
    text: 'Что-то пошло не так... Кажется, мы где-то потеряли логику.',
  },
  401: {
    span: '1',
    text: 'Секретная зона. Пожалуйста, войдите в систему.',
  },
  403: {
    span: '3',
    text: 'Сюда нельзя, там драконы. Ну или просто у вашего аккаунта недостаточно прав.',
  },
  404: {
    span: '4',
    text: 'Упс... Ошибка 404. То что вы искали не нашлось',
  },

  500: {
    span: '0',
    text: 'Ошибка на сервере. Мы уже работаем над исправлением'
  },
  502: {
    span: '2',
    text: 'Устроили генеральную уборку и протираем серверы от пыли. Скоро все вернется!'
  },
  503: {
    span: '3',
    text: 'Сервис временно недоступен. Идут технические работы'
  },
  504: {
    span: '4',
    text: 'Время вышло! Мы слишком долго ждали ответа от сервера, но он решил промолчать.'
  },
} as const;

const firstSpan = computed(() => {
  if (!props.code) return '4';
  return String(props.code).startsWith('5') ? '5' : '4';
});

const content = computed(() => {

  if (props.code && props.code in errorContent) {
    return errorContent[props.code as keyof typeof errorContent];
  }

  if (String(props.code).startsWith('5')) {
    return errorContent[500];
  }

  return errorContent[400];
});

</script>
<style scoped lang="scss">
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 30px;

  &__status-holder {
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
