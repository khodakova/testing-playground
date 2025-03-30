<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps<{
    modelValue: string | null
  }>();

  const emit = defineEmits<{(e: 'update:modelValue', newValue: string | null): void}>();

  const _value = ref<string | null>(props.modelValue || null);

  watch(() => props.modelValue, () => {
    _value.value = props.modelValue;
  }, { immediate: true });

  watch(_value, () => {
    emit('update:modelValue', _value.value);
  });
</script>

<template>
  <input v-model="_value" placeholder="Введите значение">
</template>

<style scoped>

</style>
