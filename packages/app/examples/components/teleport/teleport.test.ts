import { mount } from '@vue/test-utils';
import {
  afterEach, beforeEach, describe, expect, test
} from 'vitest';
import TeleportExample from './teleport-example.vue';
import AppInput from '../app-input.vue';

const Component = TeleportExample;
type Props = InstanceType<typeof Component>['$props']

function createWrapper1 (props: Props) {
  return mount(
    Component,
    { props, });
}

function createWrapper2 (props: Props) {
  return mount(
    Component,
    {
      props,
      global: { stubs: { Teleport: true } }
    });
}

/**
 * Если мы не используем стаб для телепорта, мы не можем взаимодействовать с компонентом как с элементом дерева
 * Мы взаимодействуем с ним через обертки вью на уровне виртуального дома
 */
describe('', () => {
  let sut: ReturnType<typeof createWrapper1>;

  beforeEach(() => {
    const el = document.createElement('div');
    el.id = 'example';
    document.body.appendChild(el);
  });

  afterEach(() => {
    sut.unmount();
    document.body.innerHTML = '';
  });

  test('Пытаемся найти элемент по его data-testid', () => {
    sut = createWrapper1({ to: '#example' });
    const inputs = sut.findAllComponents(AppInput);
    const firstInput = inputs.find((item) => item.attributes()?.['data-testid'] === 'input1');

    expect(firstInput.props('modelValue')).toBe(null);
  });
});

/**
 * Если мы используем стаб для телепорта, можем доставать элементы как обычно
 */
describe('', () => {
  let sut: ReturnType<typeof createWrapper2>;

  beforeEach(() => {
    const el = document.createElement('div');
    el.id = 'example';
    document.body.appendChild(el);
  });

  afterEach(() => {
    sut.unmount();
    document.body.innerHTML = '';
  });

  test('Пытаемся найти элемент по его data-testid', () => {
    sut = createWrapper2({ to: '#example' });
    const firstInput = sut.getByDataTest('input1').getComponent({ name: 'AppInput' });

    expect(firstInput.props('modelValue')).toBe(null);
  });
});
