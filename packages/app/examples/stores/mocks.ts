import {
  RouteLocationNormalizedLoaded, RouteLocationRaw, Router, RouterOptions
} from 'vue-router';
import { Ref, ref } from 'vue';

const emptyCurrentRoute = {
  fullPath: '',
  path: '',
  query: {},
  hash: '',
  name: '',
  params: {},
  matched: [],
  meta: {},
} as unknown as RouteLocationNormalizedLoaded;

export class VueRouterMock {
  router: Router;

  constructor (props?: {currentRoute?: Partial<RouteLocationNormalizedLoaded>, options?: Partial<RouterOptions>}) {
    const route = { ...emptyCurrentRoute, ...props?.currentRoute };
    const _currentRoute = ref<RouteLocationNormalizedLoaded>(route);
    this.router = {
      currentRoute: _currentRoute as Ref<RouteLocationNormalizedLoaded>,
      options: {
        history: { state: { back: '', }, },
        ...props?.options,
      } as unknown as RouterOptions,
      // @ts-expect-error типизацией можем пренебречь для примера
      push (data: Partial<RouteLocationRaw>) {
        this.currentRoute.value = {
          ...this.currentRoute.value,
          ...typeof data === 'object' ? data : {},
        } as RouteLocationNormalizedLoaded;
      },
      // @ts-expect-error типизацией можем пренебречь для примера
      replace (data: Partial<RouteLocationRaw>) {
        this.currentRoute.value = {
          ...this.currentRoute.value,
          ...typeof data === 'object' ? data : {},
        } as RouteLocationNormalizedLoaded;
      },
      go (data: any) {
        this.currentRoute.value = data;
      },
    };
  }

  get route () {
    return this.router.currentRoute.value;
  }

  clear () {
    this.router.currentRoute.value = emptyCurrentRoute;
  }

  setBack (value: string) {
    this.router.options.history.state.back = value;
  }
}
