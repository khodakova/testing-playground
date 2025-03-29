<script setup lang="ts">
  import AppInput from './app-input.vue';
  import { ref, watch } from 'vue';

  const emit = defineEmits<{(e: 'changeForm', newForm: Record<string, any>): void}>();

  const _form = ref<{
    input1: string | null,
    input2: string | null,
  }>({
    input1: null,
    input2: null,
  });

  watch(_form, () => {
    console.log(_form.value);
    emit('changeForm', _form.value);
  }, { deep: true });
</script>

<template>
  <div>
    <AppInput v-model="_form.input1" data-testid="input1" />
    <AppInput v-model="_form.input2" data-testid="input2" />
  </div>
</template>

<style scoped>

</style>
