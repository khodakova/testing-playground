<script setup lang="ts">
  import SomeForm from '../some-form.vue';

  defineProps<{
    to?: string;
  }>();
</script>

<template>
  <Teleport :to="to || 'body'">
    <SomeForm submitImmediately />
  </Teleport>
</template>

<style scoped>

</style>
