import {
  defineStore, createPinia, setActivePinia
} from 'pinia';
import {
  afterEach, beforeEach, test, vi, describe, expect
} from 'vitest';
import { ref, watch } from 'vue';
import { createTestingPinia } from '@pinia/testing';
import { $axios } from '../../../__mocks__/config';
import { mockAxios } from '../../../test-setup';
import { flushPromises } from '@vue/test-utils';

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
    // не забыть замокать эндпойнт, к которому будет произведено обращение!
    mockAxios.onGet(TESTED_URL).replyOnce(200, response);
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
    await flushPromises();

    expect(mockAxios.history.get.filter((x) => x.url === TESTED_URL)).toHaveLength(1);
  });
});
