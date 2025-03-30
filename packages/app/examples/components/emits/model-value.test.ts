import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, test,
} from 'vitest';
import SomeForm from '../some-form.vue';

const Component = SomeForm;
type Props = InstanceType<typeof Component>['$props']

function createWrapper (props?: Props) {
  return mount(Component, { props });
}

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    sut.unmount();
  });

  test('Смена modelValue порождает эмит на изменение формы', async () => {
    sut = createWrapper({ submitImmediately: true });

    await sut.getByDataTest('input1').getComponent({ name: 'AppInput' }).setValue('test');

    expect(sut.emitted('submit')).toBeDefined();
  });

  test('Смена modelValue порождает эмит на изменение формы', async () => {
    sut = createWrapper({ submitImmediately: true });

    sut.getByDataTest('input1').getCurrentComponent().emit('update:modelValue', 'test');
    await sut.vm.$nextTick();

    expect(sut.emitted('submit')).toBeDefined();
  });

  test('Изначально изменений формы не инициализируется', async () => {
    sut = createWrapper({ submitImmediately: true });

    expect(sut.emitted('submit')).toBeUndefined();
  });
});
