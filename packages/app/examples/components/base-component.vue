<script setup lang="ts">
  import ExtraInfo from './extra-info.vue';

  defineProps<{
    title: string,
    description?: string,
    extraInfo?: string[]
  }>();

</script>

<template>
  <div>
    <h1 id="title" class="title">{{ title }}</h1>
    <p v-if="description" id="description">{{ description }}</p>
    <template v-if="extraInfo?.length > 0">
      <div>
        {{ extraInfo[0] }}
      </div>
      <ExtraInfo v-if="extraInfo.slice(1).length > 0" class="extra-info" :extraInfo="extraInfo.slice(1)" />
    </template>
  </div>
</template>

<style scoped>

</style>
