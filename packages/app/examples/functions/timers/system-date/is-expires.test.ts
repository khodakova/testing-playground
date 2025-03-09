import {
  afterEach, expect, test, vi, describe
} from 'vitest';
import { differenceInHours } from 'date-fns/fp';

const date = new Date(2024, 1, 1);
vi.setSystemTime(date);

const DAYS_TO_EXPIRE = 14;

/**
 * Возвращает статус - истек или нет
 *
 * В функции используется new Date() - т.е. это значение будет каждый раз уникальным
 *
 * Чтобы написать тест, который будет всегда выполняться, нужно жестко задать системное время с помощью vi.setSystemTime -
 * т.к. new Date() в функции в тесте всегда будет возвращать заданное значение
 * @link https://vitest.dev/api/vi.html#vi-setsystemtime
 */
function isCertificateExpires (date: Date) {
  const hoursDifference = differenceInHours(new Date(), date) / 24;

  return hoursDifference <= DAYS_TO_EXPIRE;
}

describe('IsExpires', () => {
  afterEach(() => {
    vi.clearAllTimers();
  });

  test('Срок истечения меньше 14 дней без учета часов => true', () => {
    expect(isCertificateExpires(new Date(2024, 1, 13))).toBe(true);
  });

  test('Срок истечения меньше 14 дней плюс часы => true', () => {
    expect(isCertificateExpires(new Date(2024, 1, 13, 15))).toBe(true);
  });

  test('Срок истечения = 14 дней без учета часов => true', () => {
    expect(isCertificateExpires(new Date(2024, 1, 15))).toBe(true);
  });

  test('Срок истечения = 14 дней минус часы => true', () => {
    expect(isCertificateExpires(new Date(2024, 1, 14, 15))).toBe(true);
  });

  test('Срок истечения = 14 дней плюс часы => false', () => {
    expect(isCertificateExpires(new Date(2024, 1, 15, 15))).toBe(false);
  });

  test('Срок истечения больше 14 дней без учета часов => false', () => {
    expect(isCertificateExpires(new Date(2024, 1, 16))).toBe(false);
  });

  test('Срок истечения больше 14 дней плюс часы => false', () => {
    expect(isCertificateExpires(new Date(2024, 1, 16, 15))).toBe(false);
  });
});
