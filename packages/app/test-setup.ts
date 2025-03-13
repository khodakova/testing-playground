import MockAdapter from 'axios-mock-adapter';
import { $axios } from './__mocks__/config';

export const mockAxios = new MockAdapter($axios);
