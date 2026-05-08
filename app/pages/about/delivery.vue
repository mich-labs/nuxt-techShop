<template>
    <about-template :title="delivery?.title">
        <app-content :content="delivery" />
    </about-template>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: delivery } = await useAsyncData(
    route.path,
    () => queryCollection('content').path(route.path).first()
)

useSeoMeta({
    title: delivery.value?.title,
    description: delivery.value?.description
})
</script>
