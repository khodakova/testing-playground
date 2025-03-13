import {
  afterEach, beforeEach, test, vi, describe, expect
} from 'vitest';
import {
  createPinia, setActivePinia, defineStore
} from 'pinia';
import { DeepPartial } from '../types';
import { ref } from 'vue';
import { createTestingPinia } from '@pinia/testing';

const EXAMPLE_STORE_NAME = 'example';

const useExample = defineStore(EXAMPLE_STORE_NAME, () => {
  const filter = ref({ test: 'test' });

  return { filter };
});

const testedStore = useExample;
type StateToReturn = DeepPartial<ReturnType<typeof testedStore>>

/**
 * Какие преимущества дает перед обычной установкой initialState:
 * - типизированный стейт
 * - удобная возможность отслеживать ошибки при смене неймингов свойств
 * - установка стейта "по месту" - только для обрабатываемого стора (не блокирует возможность устанавливать стейт для других сторов)
 * @param args
 */
function createTestedStore (initialState: StateToReturn) {
  return testedStore(createTestingPinia({
    initialState: { [EXAMPLE_STORE_NAME]: initialState },
    stubActions: false,
    createSpy: vi.fn,
  }));
}

const pinia = createPinia();

describe('Корректно происходит установка начального значения стейта', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    setActivePinia(pinia);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Через установку посредником getInitialState', () => {
    const newVal = 'new';
    sut = createTestedStore({ filter: { test: newVal } });

    expect(sut.filter.test).toBe(newVal);
  });

  /**
   * Для каждого стора можно передать свое начальное состояние:
   * - ключ - используется название стора
   * - значение - нужное инитное состояние
   */
  test('Напрямую через initialState', () => {
    const newVal = 'new';
    sut = createTestedStore({ filter: { test: newVal }, });

    expect(sut.filter.test).toBe(newVal);
  });
});
