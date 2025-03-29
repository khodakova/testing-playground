<script setup lang="ts">

  import { useRouter } from 'vue-router';

  defineProps<{
    extraInfo: string[]
  }>();

  const router = useRouter();

  function onClickItem (idx: number) {
    router.push(`/some-page/${idx}`);
  }
</script>

<template>
  <div>
    <div v-for="(infoItem, idx) in extraInfo" :key="idx" @click="onClickItem(idx)">
      {{ infoItem }}
    </div>
  </div>
</template>

<style scoped>

</style>
