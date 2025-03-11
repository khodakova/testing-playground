import {
  describe, expect, test, vi
} from 'vitest';
import { capitalizeFullName, getFullName } from './helpers';

/**
 * Частичный мок модуля может осуществляться с помощью vi.importActual или importOriginal из фабрики vi.mock
 *
 * @link https://vitest.dev/api/vi.html#vi-importactual
 */
vi.mock('./helpers', async (importOriginal) => ({
  ...await importOriginal<typeof import('./helpers')>(),
  getFullName: vi.fn().mockReturnValue('тестов аркадий молодцевич')
}));

function testFn () {
  const fullName = getFullName('fio');
  return capitalizeFullName(fullName);
}

describe('Частичный мок модуля', () => {
  test('Выполняется успешно', () => {
    expect(testFn()).toEqual('Тестов Аркадий Молодцевич');
  });
});
