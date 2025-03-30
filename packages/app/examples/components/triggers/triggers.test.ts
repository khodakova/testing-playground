import { mount } from '@vue/test-utils';
import {
  afterEach, describe, test, expect,
} from 'vitest';
import SomeForm from '../some-form.vue';

const Component = SomeForm;
type Props = InstanceType<typeof Component>['$props']

function createWrapper (props: Props) {
  return mount(Component, { props });
}

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    sut.unmount();
  });

  test('Триггерим событие сабмита формы', async () => {
    sut = createWrapper({ });

    await sut.getByDataTest('input1').getComponent({ name: 'AppInput' }).setValue('test');
    await sut.getByDataTest('form').trigger('submit');

    expect(sut.emitted('submit')).toHaveLength(1);
    expect(sut.emitted('submit')[0]).toEqual([{ input1: 'test', input2: null }]);
  });

  test('Триггерим событие изменения инпута', async () => {
    sut = createWrapper({ });
    const input = sut.getByDataTest('input1');

    input.element.value = 'test123';
    await sut.getByDataTest('input1').trigger('input');

    expect(sut.getByDataTest('input1').getComponent({ name: 'AppInput' }).props('modelValue')).toBe('test123');
  });
});
