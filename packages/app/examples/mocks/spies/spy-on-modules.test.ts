import {
  test, describe, vi, expect
} from 'vitest';
import * as toastify from 'vue3-toastify';
import { toast } from 'vue3-toastify';

const text = 'any message';

function showNotification (message: string) {
  toast(message);
}

vi.mock('vue3-toastify');

describe('Шпионы на модули', () => {
  test('spyOn - Шпион отслеживается', () => {
    // https://vitest.dev/api/vi.html#vi-spyon
    const spy = vi.spyOn(toastify, 'toast');

    showNotification(text);

    expect(spy).toHaveBeenCalledOnce();
  });

});
