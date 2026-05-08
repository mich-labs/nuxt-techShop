<template>
    <about-template :title="varantyPayment?.title">
        <app-content :content="varantyPayment" />
    </about-template>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: varantyPayment } = await useAsyncData(
    route.path,
    () => queryCollection('content').path(route.path).first()
)

useSeoMeta({
    title: varantyPayment.value?.title,
    description: varantyPayment.value?.description
})
</script>
