<template>
    <div class="topbar">
        <app-container>
            <div class="topbar__inner">
                <div class="topbar__left">
                    <app-nav :routes="ABOUT_ROUTES" :icons="false" :capitalize="true" size="small" />
                </div>
                <div class="topbar__right">
                    <app-social-list :social-routes="socialLinks" />
                    <app-theme-switcher />
                </div>
            </div>
        </app-container>
    </div>
</template>

<script setup lang="ts">
import { ABOUT_ROUTES } from '~/constants/routes/aboutRoutes';
import { socialLinks } from '~/constants/links/socialLinks';
</script>

<style scoped lang="scss">
.topbar {
    width: 100%;

    display: flex;
    align-items: center;
    color: var(--text-2);
    background-color: var(--bg-2);
    border-radius: 20px 20px 0 0;

    &__inner {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;

    }

    &__right {
        display: flex;
        align-items: center;
        gap: 15px;
    }

    &__social {
        display: flex;
        align-items: center;
    }
}
</style>