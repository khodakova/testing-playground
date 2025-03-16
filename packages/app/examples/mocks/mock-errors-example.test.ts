import { ref } from 'vue';
import { test, vi } from 'vitest';
import { useAnyExternalFunction } from './helpers';

function useAnyFunctionalWeWantToTest () {
  const lastRoute = ref<null | string>(null);

  function getLastRoute () {
    lastRoute.value = localStorage.getItem('lastRoute') || null;
    return lastRoute.value;
  }

  useAnyExternalFunction();

  return { getLastRoute };
}

vi.mock('./helpers');

test('', () => {
  useAnyFunctionalWeWantToTest();
});
