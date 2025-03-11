import {
  test, describe, vi, expect, afterEach
} from 'vitest';
import { toast } from 'vue3-toastify';

const mocks = { someFunction: vi.fn() };

function executeSomeFunction (message: string) {
  mocks.someFunction(message);
}

const text = 'any message';

// такой мок АВТОМАТИЧЕСКИ оборачивает весь экспортируемый функционал в vi.fn() и дальше вызов функций можно отслеживать
vi.mock('vue3-toastify');

describe('Шпионы на модули', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('vi.fn() - это функция-мок, выполнение которой можно также отслеживать', () => {
    executeSomeFunction(text);

    expect(mocks.someFunction).toHaveBeenCalledWith(text);
  });

  test('Если модуль замокан на верхнем уровне - можно отследить вызов любой функции из него', () => {
    toast(text);

    expect(toast).toHaveBeenCalledWith(text);
  });
});
