<script setup lang="ts">
  defineProps<{
    title: string,
    description?: string,
  }>();
</script>

<template>
  <div>
    <h1 class="title" data-testid="title">{{ title }}</h1>
    <p v-if="description" data-testid="description">{{ description }}</p>
  </div>
</template>

<style scoped>

</style>
