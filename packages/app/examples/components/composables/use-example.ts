import {
  onMounted, ref, watch
} from 'vue';
import { toast } from 'vue3-toastify';

export function useExample (initialState?: boolean) {
  const errorTrigger = ref(initialState || false);

  function showError () {
    if (errorTrigger.value) {
      toast('This is error!', { type: 'error' });
    }
  }

  watch(errorTrigger, () => {
    showError();
  });

  onMounted(() => {
    showError();
  });

  return { errorTrigger };
}
