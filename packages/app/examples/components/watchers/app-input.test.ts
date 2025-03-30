import { mount } from '@vue/test-utils';
import {
  afterEach, describe, expect, test
} from 'vitest';
import AppInput from '../app-input.vue';

const Component = AppInput;
type Props = InstanceType<typeof Component>['$props']

function createWrapper (props: Props) {
  return mount(Component, { props });
}

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    sut.unmount();
  });

  test('Отслеживаем вотчер при изменении пропсов', async () => {
    sut = createWrapper({ modelValue: null });

    await sut.setProps({ modelValue: 'NEW' });

    expect(sut.props('modelValue')).toBe('NEW');
  });

  test('Отслеживаем вотчер при внутреннего контента компонента', async () => {
    sut = createWrapper({ modelValue: null });
    const input = sut.find('input');

    input.element.value = 'test123';
    await input.trigger('input');

    expect(sut.emitted('update:modelValue')[0]).toEqual(['test123']);
  });
});
