<template>
    <about-template :title="about?.title">
        <app-content :content="about" />
    </about-template>

</template>

<script setup lang="ts">
const route = useRoute()

const { data: about } = await useAsyncData(
    route.path,
    () => queryCollection('content').path(route.path).first()
)

useSeoMeta({
    title: about.value?.title,
    description: about.value?.description
})
</script>
<style scoped lang="scss"></style>
