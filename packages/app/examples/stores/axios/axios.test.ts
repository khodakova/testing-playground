import {
  defineStore, createPinia, setActivePinia
} from 'pinia';
import {
  afterEach, beforeEach, expect, test, vi, describe
} from 'vitest';
import { ref, watch } from 'vue';
import { flushPromises } from '@vue/test-utils';
import { mockAxios } from '../../../test-setup';
import { createTestingPinia } from '@pinia/testing';
import { $axios } from '../../../__mocks__/config';

export const AXIOS_TEST = 'axios-test';
const TESTED_URL = 'test';

export const axiosTest = defineStore(AXIOS_TEST, () => {
  const page = ref(0);

  /** метод, выполняющий запрос к серверу */
  async function doQuery () {
    return $axios.get(TESTED_URL).then((res) => res.data);
  }

  watch(page, () => {
    doQuery();
  });

  return {
    doQuery,
    page,
  };
});

const testedStore = axiosTest;

function createTestedStore () {
  return testedStore(createTestingPinia({
    initialState: { [AXIOS_TEST]: { } },
    stubActions: false,
    createSpy: vi.fn,
  }));
}

/**
 * Демонстрация мока запроса
 */
describe('axios', () => {
  let sut: ReturnType<typeof createTestedStore>;

  const response = { test: 'test' };

  beforeEach(() => {
    // мокаем необходимый запрос до вызова метода, который его дергает
    // если его не замокать, будет возвращена ошибка
    mockAxios.onGet(TESTED_URL).reply(200, response);
    setActivePinia(createPinia());
    sut = createTestedStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
    mockAxios.reset();
  });

  test('Запрос успешно замокан', async () => {
    const res = await sut.doQuery();

    expect(res).toEqual(response);
  });

  test('При изменении пагинации выполняется запрос', async () => {
    sut.page = 500;
    // необходимо вызвать flushPromises, чтобы все необходимые промисы были "выполнены" в среде теста
    await flushPromises();

    // проверяем, что запрос был выполнен
    expect(mockAxios.history.get.filter((x) => x.url === TESTED_URL)).toHaveLength(1);
  });
});
