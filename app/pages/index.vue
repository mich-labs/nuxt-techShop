<template>
  <app-stack
    direction="column"
    :gap="100"
  >
    <the-hero-carousel />
    <the-banner-section :reverse="true" />
  </app-stack>
</template>
<script setup lang="ts"></script>
