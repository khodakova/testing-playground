import {
  afterEach,
  describe, expect, test, vi
} from 'vitest';
import { useExample } from './use-example';
import { defineComponent, nextTick } from 'vue';
import { mount } from '@vue/test-utils';
import { toast } from 'vue3-toastify';

function createWrapper (initialState?: boolean) {
  const TestComponent = defineComponent({
    props: {},
    setup () {
      return useExample(initialState);
    },
    template: '<div></div>',
  });
  return mount(TestComponent);
}

vi.mock('vue3-toastify');

describe('', () => {
  let sut: ReturnType<typeof createWrapper>;

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Можем отслеживать любые изменения по ЖЦ', async () => {
    sut = createWrapper(true);

    await nextTick();

    expect(toast).toHaveBeenCalledOnce();
  });

  test('Можем отслеживать любые изменения по ЖЦ', async () => {
    sut = createWrapper(false);

    expect(toast).not.toHaveBeenCalled();

    sut.vm.errorTrigger = true;
    await nextTick();

    expect(toast).toHaveBeenCalledOnce();
  });
});
