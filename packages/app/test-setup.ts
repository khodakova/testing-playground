import MockAdapter from 'axios-mock-adapter';
import { $axios } from './__mocks__/config';
import { config } from '@vue/test-utils';
import { GetByDataTestPlugin } from './plugins/get-by-data-test';

export const mockAxios = new MockAdapter(
  $axios as any,
  { onNoMatch: 'throwException' }
);

config.plugins.VueWrapper.install(GetByDataTestPlugin);
