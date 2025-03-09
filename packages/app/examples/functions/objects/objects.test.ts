import {
  expect, test, describe
} from 'vitest';

const arrayItem1 = { label: '1' };
const arrayItem2 = { label: '2' };

const mockObject = {
  any: 'field',
  in: 'object',
  we: 1,
  want: 'to check',
  array: [arrayItem1, arrayItem2],
};

describe('Проверка полей в объекте', () => {
  describe('Проверка наличия поля в объекте', () => {
    // https://vitest.dev/api/expect#tohaveproperty
    test('прямая проверка', () => {
      expect(mockObject.any).toBe(mockObject.any);
    });

    // https://vitest.dev/api/expect#tohaveproperty
    test('с помощью toHaveProperty', () => {
      expect(mockObject).toHaveProperty('any', mockObject.any);
    });

    // https://vitest.dev/api/expect#expect-objectcontaining
    test('с помощью objectContaining', () => {
      expect(mockObject).toEqual(expect.objectContaining({
        any: mockObject.any,
        in: mockObject.in,
      }));
    });

    // https://vitest.dev/api/expect#toequal
    test.fails('toEqual не даст проверить одно поле из объекта, т.к. проверяет полностью проверяет структуру переданного значения', () => {
      expect(mockObject).toEqual({ any: mockObject.any });
    });
  });

  describe('Проверка наличия элементов в массиве', () => {
    // https://vitest.dev/api/expect#expect-arraycontaining
    test('одного элемента в массиве с помощью arrayContaining', () => {
      expect(mockObject).toEqual(
        expect.objectContaining({ array: expect.arrayContaining([arrayItem1]), }),
      );
    });

    test('одного элемента в массиве с помощью toContain', () => {
      expect(mockObject.array).toContain(arrayItem1);
    });

    test('несколько элементов в массиве', () => {
      expect(mockObject).toEqual(
        expect.objectContaining({ array: expect.arrayContaining([arrayItem1, arrayItem2]), }),
      );
    });

    test.fails('toEqual не даст проверить один элемент из массива, т.к. проверяет полностью проверяет структуру переданного значения', () => {
      expect(mockObject.array).toEqual([mockObject.array[0]]);
    });

    test('всего массива', () => {
      expect(mockObject).toEqual(
        expect.objectContaining({ array: expect.arrayContaining(mockObject.array), }),
      );
    });
  });

  // проверяет ТОЛЬКО полное соответствие
  test('Проверка всего объекта с помощью toEqual', () => {
    expect(mockObject).toEqual(mockObject);
  });
});
