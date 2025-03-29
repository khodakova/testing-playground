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

const pinia = createPinia();

describe('example', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    setActivePinia(pinia);
    sut = createTestedStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Через созданный колбэк-сеттер', async () => {
    const logSpy = vi.spyOn(console, 'log');

    sut.setFilter({ test: 'NEW' });
    await nextTick();

    expect(logSpy).toHaveBeenCalledWith('I am in doSomething');
  });

  test('Через patch', async () => {
    const logSpy = vi.spyOn(console, 'log');

    sut.$patch((state) => {
      state.filter = { test: 'SOME VALUE' };
    });
    await nextTick();

    expect(logSpy).toHaveBeenCalledWith('I am in doSomething');
  });

  test('Через изменение свойства напрямую', async () => {
    const logSpy = vi.spyOn(console, 'log');

    sut.filter = { test: 'NEW' };
    await nextTick();

    expect(logSpy).toHaveBeenCalledWith('I am in doSomething');
  });
});
