import {
  expect, test, describe
} from 'vitest';
import { getLink } from './get-link';

const MOCK_ARGS = [
  {
    name: 'Без параметров',
    path: ':mode/:exKey',
    params: {},
    response: ':mode/:exKey',
  },
  {
    name: 'Все параметры указаны',
    path: ':mode/:exKey',
    params: { mode: '123', exKey: 999 },
    response: '123/999',
  },
  {
    name: 'Части урла совпадают с названиями параметров',
    path: ':mode/mode/exKey/:exKey',
    params: { mode: '123', exKey: 999 },
    response: '123/mode/exKey/999',
  },
  {
    name: 'Параметры указаны частично (начальный)',
    path: ':mode/:exKey',
    params: { mode: '123' },
    response: '123/:exKey',
  },
  {
    name: 'Параметры указаны частично (конечный)',
    path: ':mode/:exKey',
    params: { exKey: '123' },
    response: ':mode/123',
  },
  {
    name: 'Параметры с хвостовой строкой',
    path: ':mode/:exKey/other',
    params: { mode: '123', exKey: 999 },
    response: '123/999/other',
  },
  {
    name: 'Параметры с начальной строкой',
    path: 'other/:mode/:exKey',
    params: { mode: '123', exKey: 999 },
    response: 'other/123/999',
  },
  {
    name: 'Параметры с промежуточной строкой 1',
    path: ':mode/other/:exKey',
    params: { mode: '123', exKey: 999 },
    response: '123/other/999',
  },
  {
    name: 'Параметры с промежуточной строкой 2',
    path: ':mode/other/:exKey/another',
    params: { mode: '123', exKey: 999 },
    response: '123/other/999/another',
  },
  {
    name: 'Параметры с промежуточной строкой 3',
    path: 'another/:mode/other/:exKey',
    params: { mode: '123', exKey: 999 },
    response: 'another/123/other/999',
  },
  {
    name: 'С начальным слэшом',
    path: '/:mode/other/:exKey',
    params: { mode: '123', exKey: 999 },
    response: '/123/other/999',
  },
  {
    name: 'С конечным слэшом',
    path: ':mode/other/:exKey/',
    params: { mode: '123', exKey: 999 },
    response: '123/other/999',
  },
  {
    name: 'С query',
    path: ':mode/other/:exKey/',
    params: { mode: '123', exKey: 999 },
    query: { someParam: 'test', otherParam: 'test2' },
    response: '123/other/999?someParam=test&otherParam=test2',
  },
];

/**
 * test.each используется, если начинка тестов с разными аргументами выглядит одинаково
 *
 * @link https://vitest.dev/api/#test-each
 */
describe('Ссылка формируется правильно', () => {
  test.each(MOCK_ARGS)('$name', ({ path, params, response, query }) => {
    const href = getLink(path, params, query);

    expect(href).toBe(response);
  });
});
