import {
  afterEach, beforeEach, expect, test, vi, describe
} from 'vitest';
import {
  createPinia, setActivePinia, defineStore
} from 'pinia';
import { useRoute, useRouter } from 'vue-router';
import { createTestingPinia } from '@pinia/testing';
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { AxiosError } from 'axios';
import { VueRouterMock } from '../mocks';
import { mockAxios } from '../../../test-setup';
import { $axios } from '../../../__mocks__/config';

export const EXAMPLE = 'example';
const MESSAGES = {
  SUCCESS: 'success',
  ERROR: 'error',
};

/**
 * Стор пример с простейшими типовыми методами
 */
export const exampleStore = defineStore(EXAMPLE, () => {
  const router = useRouter();
  const _isLoading = ref(false);

  /** Классическое сохранение сущности. В первую очередь нужно протестировать все, что важно для бизнеса */
  async function saveData () {

    _isLoading.value = true;
    await $axios.post<string>('test')
      .then((resp) => {
        toast(MESSAGES.SUCCESS);
        router.push({
          name: 'test',
          params: { id: resp.data },
        });
      })
      .catch(() => {
        toast(MESSAGES.ERROR);
      })
      .finally(() => {
        _isLoading.value = false;
      });
  }

  /** Пример метода, который в процессе выполнения может пробросить ошибку */
  async function saveWithError () {
    await $axios.post<string>('test')
      .catch((err: AxiosError) => {
        toast(MESSAGES.ERROR);
        throw new Error(err.message);
      });
  }

  return {
    saveData,
    saveWithError,
    isLoading: _isLoading,
  };
});

const testedStore = exampleStore;
function createTestedStore () {
  return testedStore(createTestingPinia({
    initialState: { [EXAMPLE]: { someState: 'someState' } },
    stubActions: false,
    createSpy: vi.fn,
  }));
}

// ===================================== MOCKS =====================================
// мокаем роутер и уведомления, чтобы отследить вызов
vi.mock('vue3-toastify');

const routerMock = new VueRouterMock();
vi.mock('vue-router');
vi.mocked(useRouter).mockReturnValue(routerMock.router);
vi.mocked(useRoute).mockReturnValue(routerMock.route);

// ===================================== MOCKS =====================================

/**
 * Тестирование методов стора сводится к тестированию обычных функций
 *
 * За исключением того, что иногда нужно будет задать инитное значение стора, либо привести его к нужному для теста состоянию
 */
describe('saveData', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    // активируем пинью для тестов
    setActivePinia(createPinia());
    sut = createTestedStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  /**
   * Describe-блоки можно разделять по успешным/ошибочным маршрутам - таким образом можно группировать общие для
   * успешной отработки методов моки.
   *
   * Довольно частый кейс, когда нужно замокать запросы одними данными или создать другие общие моки.
   *
   * beforeEach, afterEach, beforeAll, afterAll - "замыкаются" внутри того describe-блока, в котором они объявлены.
   *
   * При этом они "схлопываются" с вышележащими хуками beforeEach, afterEach, beforeAll, afterAll:
   * например beforeEach из вышележащего describe-блока будет выполнен наряду с beforeEach внутренним describe-блоком.
   */
  describe('В случае успеха', () => {
    beforeEach(() => {
      mockAxios.onPost('test').replyOnce(200, 'test');
    });

    test('Дергается уведомление', async () => {
      await sut.saveData();

      expect(toast).toHaveBeenCalledOnce();
    });

    test('Происходит переход по роутам', async () => {
      console.log(routerMock);
      const pushSpy = vi.spyOn(routerMock.router, 'push');
      await sut.saveData();

      expect(pushSpy).toHaveBeenCalledOnce();
    });
  });

  describe('В случае ошибки', () => {
    test('Дергается уведомление', async () => {
      // таким способом можно мокать ошибку, присланную сервером
      mockAxios.onPost('test').replyOnce(() => [422, { details: { notification: { text: 'test' } } }]);
      await sut.saveData();

      expect(toast).toHaveBeenCalledOnce();
    });
  });
});

describe('saveWithError', () => {
  let sut: ReturnType<typeof createTestedStore>;

  beforeEach(() => {
    setActivePinia(createPinia());
    sut = createTestedStore();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('В случае ошибки', () => {
    test('Дергается уведомление', async () => {
      mockAxios.onPost('test').replyOnce(() => [422, { details: { notification: { text: 'test' } } }]);

      /**
       * если метод пробрасывает ошибку, то нужно заключить его в try/catch
       *
       * Иначе весь тест упадет, т.к. нет никакого обработчика ошибок
       */
      try {
        await sut.saveWithError();
      } catch { /* empty */ }

      expect(toast).toHaveBeenCalledOnce();
    });
  });
});
