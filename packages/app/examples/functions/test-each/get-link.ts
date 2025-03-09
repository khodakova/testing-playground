import { getQueryString } from './get-query-string';

/**
 * Формирует полную ссылку по пути роута, параметрам
 * @param url
 * @param params
 * @param query
 */
export function getLink (url: string, params: Record<string, any> = {}, query: Record<string, any> = {}) {
  const regExps: {regExp: RegExp, val: string}[] = [];
  Object.entries(params).forEach(([key, val]) => {
    regExps.push({
      regExp: new RegExp(`:${key}(|.)+?(\\/|$)`),
      val,
    });
  });
  const pureUrl = regExps
    .reduce((res, cur) => res.replace(cur.regExp, `${cur.val}/`), url)
    .replace(/\/$/, '');
  const queryPart = Object.keys(query).length > 0 ? `?${getQueryString(query)}` : '';

  return `${pureUrl}${queryPart}`;
}
