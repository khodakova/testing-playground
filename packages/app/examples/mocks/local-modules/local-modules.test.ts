import {
  expect, test, vi, describe, afterEach
} from 'vitest';
import { anyFunc } from './any-func';

/**
 * Мок локального модуля
 *
 * можно также использовать абсолютные пути (@/shared/lib/auth/redirect-to-auth.ts)
 *
 * Обязует следить за соответствием неймингов экспортируемых из модуля значений:
 * т.е. если меняется сигнатура функции (название, аргументы) - нужно заменить их так же и в моке
 */
vi.mock('./any-func.ts');
// ==================== MOCKS ====================

const localModules = () => {
  if (anyFunc()) {
    return 'true';
  } else {
    return 'false';
  }
};

describe('', () => {
  afterEach(() => {
    // не забываем очищать моки. Можем очистить сразу все моки
    vi.clearAllMocks();
  });

  test('Локальный модуль мокает значение', () => {
    vi.mocked(anyFunc).mockReturnValueOnce(true);
    expect(localModules()).toBe('true');

    vi.mocked(anyFunc).mockReturnValueOnce(false);
    expect(localModules()).toBe('false');
  });

  test('Вызов локального модуля отслеживается', () => {
    localModules();

    expect(anyFunc).toHaveBeenCalledOnce();
  });
});
