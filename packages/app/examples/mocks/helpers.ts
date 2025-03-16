import { useRoute, useRouter } from 'vue-router';

/**
 * Какой-то кусочек логики, построенный вокруг использования роутера
 */
export function useAnyExternalFunction () {
  const router = useRouter();
  const route = useRoute();
  console.log(router.currentRoute.value.name);
  console.log(router.push('any-location'));
  console.log(route.name);
}
