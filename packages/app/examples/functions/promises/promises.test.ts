import {
  describe, expect, test
} from 'vitest';

/**
 * - Если передаем true - промис резолвится
 * - Если передаем false - промис реджектится
 * @param res
 */
function createPromise (res: boolean) {
  return new Promise((resolve, reject) => {
    if (res) resolve('success');
    reject(new Error('failure'));
  });
}

describe('Тестирование промисов', () => {
  describe('Проверка успешного ответа', () => {
    test('Асинхронная', async () => {
      const res = await createPromise(true);

      expect(res).toBe('success');
    });

    // https://vitest.dev/api/expect.html#resolves
    test('С помощью resolves', () => {
      expect(createPromise(true)).resolves.toBe('success');
    });
  });

  describe('Проверка провального ответа', () => {
    // https://vitest.dev/api/expect.html#rejects
    test('С помощью rejects - правильный вариант', () => {
      expect(createPromise(false)).rejects.toThrowError('failure');
    });
  });
});
