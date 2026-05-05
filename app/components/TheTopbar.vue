<template>
    <div class="topbar">
        <app-container>
            <div class="topbar__inner">
                <div class="topbar__left">
                    <app-nav :routes="topbarRoutes" :icons="false" :capitalize="true" size="small" />
                </div>
                <div class="topbar__right">
                    <app-social-list :social-routes="socialRoutes" />
                </div>
            </div>
        </app-container>
    </div>
</template>
<script setup lang="ts">
import type { TRoutes } from '~~/types/routeLinks.type';
import type { TSocials } from './ui/AppSocialList.vue';

const topbarRoutes: TRoutes = [
    { name: 'about', to: '/about', title: 'о магазине' },
    { name: 'delivery', to: '/delivery', title: 'доставка' },
    { name: 'varanty-payment', to: '/varanty-payment', title: 'гарантия и оплата' },
    { name: 'contacts', to: '/contacts', title: 'контакты' },
]
const socialRoutes: TSocials = [
    { name: 'telegram', to: 'https://web.telegram.org/' },
    { name: 'viber', to: 'https://www.viber.com/ru/' },
    { name: 'mail', to: 'https://www.gmail.com/mail/help/intl/ru/about.html?de.' },
]
</script>
<style scoped lang="scss">
.topbar {
    width: 100%;

    display: flex;
    align-items: center;
    color: var(--text-2);
    background-color: var(--bg-2);
    border-radius: 20px 20px 0 0;

    transition:
        color .3s linear,
        background-color .3s linear;

    &__inner {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    &__right {
        display: flex;
        align-items: center;
    }

    &__social {
        display: flex;
        align-items: center;
    }
}
</style>