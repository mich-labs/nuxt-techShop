<template>
    <div
        class="theme-switcher"
        :class="{ 'theme-switcher--light': colorMode.value === 'light' }"
        @click="changeTheme"
    >
        <div class="theme-switcher__button">
            <svg class="theme-switcher__icon">
                <use xlink:href="/sprite.svg#moon" class="moon" />
                <use xlink:href="/sprite.svg#sun" class="sun" />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode();
const changeTheme = () => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
}
</script>

<style scoped lang="scss">
.theme-switcher {
    position: relative;
    width: 40px;
    height: 22px;
    background-color: var(--ui-2);
    border: solid 1px var(--ui-1);
    border-radius: 20px;
    cursor: pointer;
    transition: border-color linear var(--t-2);
    &:hover {
        border-color: var(--accent);
    }

    &__button {
        position: absolute;
        top: 1px;
        right: 1px;
        width: 18px;
        height: 18px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: var(--bg-1);
        border-radius: 50%;
        transition: transform .3s ease;

        transform: translateX(0);

        .moon {
            display: block;
        }

        .sun {
            display: none;
        }
    }

    &__icon {
        width: 12px;
        height: 12px;
        fill: var(--text-1);
    }

    &--light {
        .theme-switcher__button {
            transform: translateX(-18px);

            .moon {
                display: none;
            }

            .sun {
                display: block;
            }
        }
    }
}
</style>