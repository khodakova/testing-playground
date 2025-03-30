<script setup lang="ts">
  import AppInput from './app-input.vue';
  import { ref, watch } from 'vue';

  const props = defineProps<{
    submitImmediately?: boolean,
  }>();
  const emit = defineEmits<{(e: 'submit', newForm: Record<string, any>): void}>();

  const _form = ref<{
    input1: string | null,
    input2: string | null,
  }>({
    input1: null,
    input2: null,
  });

  watch(_form, () => {
    console.log(_form.value);
    if (props.submitImmediately) {
      emit('submit', _form.value);
    }
  }, { deep: true });

  function onSubmit () {
    emit('submit', _form.value);
  }
</script>

<template>
  <div>
    <form data-testid="form" @submit.prevent="onSubmit">
      <AppInput v-model="_form.input1" data-testid="input1" />
      <AppInput v-model="_form.input2" data-testid="input2" />

      <button data-testid="submitBtn" type="submit">submit</button>
    </form>
  </div>
</template>

<style scoped>

</style>
