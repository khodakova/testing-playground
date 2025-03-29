import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, test
} from 'vitest';
import SomeComponent from './some-component.vue';

const Component = SomeComponent;
type Props = InstanceType<typeof Component>['$props']

function createWrapper (props: Props) {
  return mount(Component, { props });
}

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    sut.unmount();
  });

  test('Поиск с помощью getByDataTest', () => {
    sut = createWrapper({ title: 'test' });

    expect(sut.getByDataTest('title').text()).toBe('test');
  });

  test('Элемент не найден, возвращается ошибка', () => {
    sut = createWrapper({ title: 'test' });

    expect(() => sut.getByDataTest('description')).toThrowError();
  });
});
