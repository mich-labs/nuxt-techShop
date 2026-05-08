export default defineNuxtRouteMiddleware((to) => {
    const pageTitle = to.meta.title as string;

    if (pageTitle) {
        useSeoMeta({
            title: pageTitle,
            ogTitle: pageTitle,
            description: to.meta.description as string || 'Продажа Электроники / Гаджетов ⭐️ Официальная гарантия ✔️ Скидки % ⚡️ Доставка',
        })
    }
})