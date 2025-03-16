import {
  expect, test, vi, describe, afterEach
} from 'vitest';

const fnWithEnv = () => {
  if (import.meta.env.MODE === 'prod') {
    return 'THIS IS PROD ENVIRONMENT';
  }
  return 'THIS IS DEV';
};

/**
 * Если есть необходимость проверять код, зависящий от переменных окружения, vitest предоставляет такую возможность
 * посредством vi.stubEnv
 *
 * @link https://vitest.dev/api/vi.html#vi-stubenv
 */
describe('', () => {
  afterEach(() => {
    // обнуляем все значения, которые стабили https://vitest.dev/api/vi.html#vi-unstuballenvs
    vi.unstubAllEnvs();
  });

  test('Возвращается застабленная переменная окружения', () => {
    vi.stubEnv('MODE', 'development');
    expect(fnWithEnv()).toBe('THIS IS DEV');

    vi.stubEnv('MODE', 'prod');
    expect(fnWithEnv()).toBe('THIS IS PROD ENVIRONMENT');
  });
});
