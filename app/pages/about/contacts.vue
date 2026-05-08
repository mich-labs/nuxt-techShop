<template>
    <about-template :title="contacts?.title">
        <app-content :content="contacts" />
    </about-template>
</template>

<script setup lang="ts">
const route = useRoute()

const { data: contacts } = await useAsyncData(
    route.path,
    () => queryCollection('content').path(route.path).first()
)

useSeoMeta({
    title: contacts.value?.title,
    description: contacts.value?.description
})
</script>
