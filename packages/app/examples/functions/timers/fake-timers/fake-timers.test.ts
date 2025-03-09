import {
  afterEach, beforeEach, expect, test, vi, describe
} from 'vitest';

const spy = vi.fn();

const DELAY = 500;

function exampleFunc () {
  setTimeout(() => {
    spy();
  }, DELAY);
}

/**
 * Для тестирования функций, завязанных на использование времени, нужно использовать vi.useFakeTimers
 *
 * @link https://vitest.dev/api/vi.html#vi-usefaketimers
 */
describe('FakeTimers', () => {
  beforeEach(() => {
    // используем фейковые таймеры для тестирования
    vi.useFakeTimers();
  });

  afterEach(() => {
    // используем настоящие таймеры
    vi.useRealTimers();
    // очищаем таймеры после каждого теста
    vi.clearAllTimers();
    spy.mockClear();
  });

  test('До истечения таймера функция не вызывается', async () => {
    exampleFunc();

    expect(spy).not.toHaveBeenCalled();
  });

  test('По истечении таймера функция вызывается', async () => {
    exampleFunc();

    // увеличиваем таймер на нужное время https://vitest.dev/api/vi.html#vi-advancetimersbytime
    vi.advanceTimersByTime(DELAY);

    expect(spy).toHaveBeenCalledOnce();
  });

  test('При повторном вызове функция вызывается еще раз', async () => {
    exampleFunc();

    vi.advanceTimersByTime(DELAY);
    vi.advanceTimersByTime(DELAY);
    exampleFunc();
    vi.advanceTimersByTime(DELAY);

    expect(spy).toHaveBeenCalledTimes(2);
  });
});
