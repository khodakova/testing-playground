import { DOMWrapper, VueWrapper } from '@vue/test-utils';

/**
 * Плагин поиска селекторов по data-test
 * @param wrapper
 * @constructor
 */
export const GetByDataTestPlugin = (wrapper: VueWrapper) => {
  function getByDataTest (selector: string) {
    const dataSelector = `[data-testid='${selector}']`;
    const element = wrapper.element.querySelector(dataSelector);
    if (element) return new DOMWrapper(element);
    throw Error('Element was not found');
  }
  return { getByDataTest };
};

declare module '@vue/test-utils' {
  interface VueWrapper {
    /**
     * Найти по атрибуту `data-testid`
     * @param value - значение атрибута `data-testid`
     */
    getByDataTest(value: string): VueWrapper,
  }
}
