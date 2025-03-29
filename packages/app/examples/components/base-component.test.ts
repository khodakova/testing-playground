import { mount } from '@vue/test-utils';
import BaseComponent from './base-component.vue';
import {
  afterEach, describe, expect, test
} from 'vitest';
import ExtraInfo from './extra-info.vue';

const Component = BaseComponent;
type Props = InstanceType<typeof Component>['$props']

function createWrapper (props: Props) {
  return mount(Component, {
    props,
    global: { stubs: { ExtraInfo: true } }
  });
}

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    sut.unmount();
  });

  describe('find', () => {
    test('Заголовок рендерится корректно', () => {
      sut = createWrapper({ title: 'testTitle', description: 'test' });

      // https://test-utils.vuejs.org/api/#find
      expect(sut.find('#title').text()).toBe('testTitle');
      expect(sut.find('h1').text()).toBe('testTitle');
      expect(sut.find('.title').text()).toBe('testTitle');
    });

    test('description передан => Описание рендерится корректно', () => {
      sut = createWrapper({ title: 'test', description: 'test' });

      expect(sut.find('#description').text()).toBe('test');
    });

    test('description не передан => Описание не рендерится', () => {
      sut = createWrapper({ title: 'test' });

      expect(sut.find('#description').exists()).toBe(false);
    });
  });

  describe('get', () => {
    test('Заголовок рендерится корректно', () => {
      sut = createWrapper({ title: 'testTitle', description: 'test' });

      // https://test-utils.vuejs.org/api/#find
      expect(sut.get('#title').text()).toBe('testTitle');
      expect(sut.get('h1').text()).toBe('testTitle');
      expect(sut.get('.title').text()).toBe('testTitle');
    });

    test('get, если элемент не найден, пробрасывает ошибку', () => {
      sut = createWrapper({ title: 'test' });

      expect(() => sut.get('#description')).toThrowError();
    });
  });

  // https://test-utils.vuejs.org/api/#findComponent - возвращает VueWrapper
  describe('findComponent', () => {
    test('extraInfo передано => компонент рендерится', () => {
      sut = createWrapper({ title: 'test', description: 'test', extraInfo: ['test', 'test'] });

      expect(sut.findComponent(ExtraInfo).exists()).toBe(true);
      expect(sut.findComponent({ name: 'ExtraInfo' }).exists()).toBe(true);
      expect(sut.findComponent('.extra-info').exists()).toBe(true);
    });

    test('Можем доставать пропсы', () => {
      sut = createWrapper({ title: 'test', description: 'test', extraInfo: ['test', 'test'] });

      expect(sut.findComponent(ExtraInfo).props('extraInfo')).toEqual(['test']);
    });

    test('Если элемент не найден, возвращается ErrorWrapper', () => {
      sut = createWrapper({ title: 'test', description: 'test', extraInfo: ['test'] });

      expect(sut.findComponent(ExtraInfo).exists()).toBe(false);
    });
  });

  describe('getCurrentComponent', () => {
    test('Можем получить компонент из найденного DomWrapper', () => {
      sut = createWrapper({ title: 'test', description: 'test', extraInfo: ['test', 'test'] });

      expect(sut.find('.extra-info').getCurrentComponent().props).toHaveProperty('extraInfo', ['test']);
    });
  });

});
