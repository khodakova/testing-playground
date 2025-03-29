import {
  createPinia, defineStore, setActivePinia
} from 'pinia';
import { ref } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import {
  beforeEach, describe, test, vi
} from 'vitest';

export const BASE_TEST = 'base-test';

export const baseTest = defineStore(BASE_TEST, () => {
  const someVar = ref();

  function someAction () {
    console.log('We are in action');
  }

  return {
    someVar,
    someAction
  };
});

function createTestedStore (initialState?: Record<string, any>) {
  return baseTest(createTestingPinia({
    initialState,
    stubActions: false,
    createSpy: vi.fn
  }));
}

describe('', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    // активируем пинью для тестов
    setActivePinia(createPinia());
    sut = createTestedStore({ [BASE_TEST]: { someVar: 123123123 } });
  });

  test('Корректно происходит установка начального значения стейта', () => {
    console.log(sut.someVar);
    sut.someAction();
  });
});
