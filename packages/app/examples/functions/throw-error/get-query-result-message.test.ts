import {
  beforeEach,
  describe, expect, test, vi
} from 'vitest';
import { toast } from 'vue3-toastify';

const RESPONSE_MESSAGES = {
  ERROR:  'Обновление не было выполнено',
  SUCCESS:  'Обновление выполнено успешно',
};

function getQueryResultMessage (response: {status: string}) {
  if (response.status !== 'SUCCESS') {
    throw new Error(RESPONSE_MESSAGES.ERROR);
  }
  return RESPONSE_MESSAGES.SUCCESS;
}

function testSmthAfterErrorThrowing (response: {status: string}) {
  if (response.status !== 'SUCCESS') {
    toast(RESPONSE_MESSAGES.ERROR);
    throw new Error(RESPONSE_MESSAGES.ERROR);
  }
}

vi.mock('vue3-toastify');

/**
 * Для того чтобы протестировать функцию, которая генерирует ошибку, нужно:
 * 1. Создать коллбэк, который вызывает функцию
 * 2. С помощью toThrowError проверить проброс ошибки
 */
describe('Тестирование функции, генерирующей ошибку', () => {
  test('Статус ответа = успех => уведомление формируется правильно', () => {
    expect(getQueryResultMessage({ status: 'SUCCESS' })).toBe(RESPONSE_MESSAGES.SUCCESS);
  });

  test('Статус ответа отличен от успешного => уведомление формируется правильно', () => {
    expect(() => getQueryResultMessage({ status: 'CANCELED' }))
      .toThrowError(RESPONSE_MESSAGES.ERROR);
  });
});

describe('testSmthAfterErrorThrowing', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('Статус ответа отличен от успешного => уведомление формируется правильно', () => {
    try {
      testSmthAfterErrorThrowing({ status: 'CANCELED' });
    } catch { /* empty */ }
    expect(toast).toHaveBeenCalledWith(RESPONSE_MESSAGES.ERROR);
  });
});
