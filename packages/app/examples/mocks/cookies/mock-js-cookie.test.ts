import Cookies from 'js-cookie';
import {
  expect, test, vi, describe
} from 'vitest';

export const ANY_COOKIES = 'any_cookie';

/**
 * Возвращает значение куки по ключу - используется напрямую js-cookie
 *
 * true - не показывать, false - показывать
  */
const mockJsCookieTest = () => {
  const cookie = Cookies.get(ANY_COOKIES);
  if (cookie) return Boolean(cookie);
  return false;
};

describe('Мок Cookies из js-cookie', () => {
  test('Мок осуществляется верно', () => {
    Cookies.get = vi.fn().mockImplementation(() => true);
    expect(mockJsCookieTest()).toBe(true);

    Cookies.get = vi.fn().mockImplementation(() => false);
    expect(mockJsCookieTest()).toBe(false);

    Cookies.get = vi.fn().mockImplementation(() => '1');
    expect(mockJsCookieTest()).toBe(true);
  });
});
