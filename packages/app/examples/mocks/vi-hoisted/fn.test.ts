import {
  test, describe, vi, expect, afterEach
} from 'vitest';
import { validate } from './validate';

/**
 * Такие фабрики позволяют:
 *
 * 1. замокать значение в дальнейшем - mocks.anyFunc.mockReturnValueOnce(true);
 * 2. отслеживать вызов (шпионить) - expect(mocks.anyFunc).toHaveBeenCalled();
 *
 * @link https://vitest.dev/api/vi.html#vi-hoisted
 */
const mocks = vi.hoisted(() => ({
  validate: vi.fn().mockImplementation(() => ({
    isValid: false,
    errors: [{}],
    getErrorByKey: vi.fn().mockReturnValue('')
  }))
}));

vi.mock('./validate', () => ({ validate: mocks.validate }));

describe('test', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Первичный мок отрабатывает корректно', () => {
    const res = validate();

    expect(res.isValid).toBe(false);
    expect(res.errors).toEqual([{}]);
  });

  test('Последующие моки перебивают предыдущие', () => {
    mocks.validate.mockImplementationOnce(() => ({
      isValid: true,
      errors: [],
      getErrorByKey: vi.fn().mockReturnValue('')
    }));
    const res = validate();

    expect(res.isValid).toBe(true);
    expect(res.errors).toEqual([]);
  });

});
