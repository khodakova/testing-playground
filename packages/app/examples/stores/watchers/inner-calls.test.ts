import {
  afterEach, beforeEach, test, vi, describe, expect
} from 'vitest';
import {
  createPinia, setActivePinia, defineStore
} from 'pinia';
import {
  nextTick, ref, watch
} from 'vue';
import { createTestingPinia } from '@pinia/testing';

const ExampleTest = 'example';

type Filter = {test: string}

const useExample = defineStore(ExampleTest, () => {
  const filter = ref<Filter>({ test: 'test' });

  function setFilter (newFilter: Filter) {
    filter.value = newFilter;
  }

  /**
   * Наш внутренний метод
   */
  function doSomething () {
    console.log('I am in doSomething');
  }

  watch(filter, () => {
    doSomething();
  });

  return {
    filter,
    setFilter,
    doSomething,
  };
});

const testedStore = useExample;

function createTestedStore () {
  return testedStore(createTestingPinia({
    stubActions: false,
    createSpy: vi.fn,
  }));
}

/**
 * Под "внутренним методом" дальше будет пониматься любой метод внутри стора, который может вызываться:
 * - в вотчерах
 * - в других методах
 * - в любых хуках
 *
 * @link https://pinia.vuejs.org/cookbook/testing.html#Unit-testing-components
 */
describe('example', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    sut = createTestedStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Нельзя отследить вызов "внутренний" вызов метода', async () => {
    const spy = vi.spyOn(sut, 'doSomething');

    sut.setFilter({ test: 'new' });
    await nextTick();

    expect(spy).toHaveBeenCalledTimes(0);
    expect(sut.doSomething).toHaveBeenCalledTimes(0);
  });

  // апдейтов от создателей нет с сентября 23 года https://github.com/vuejs/pinia/discussions/2408
  test('Отслеживать внутренний вызов можно пока что только через "посредника" - нужно протестить "реализацию" нужного метода', async () => {
    const logSpy = vi.spyOn(console, 'log');

    sut.setFilter({ test: 'new' });
    await nextTick();

    expect(logSpy).toHaveBeenCalledWith('I am in doSomething');
  });

  test('Во всех методах используется реальная реализация других методов, не шпионы', async () => {
    sut.setFilter({ test: 'new' });
    await nextTick();

    sut.doSomething();
  });

});
