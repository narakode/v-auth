import type { NavigationGuard, Router } from 'vue-router';
import { loggedIn } from './auth.js';

export const auth: NavigationGuard = (to) => {
  if (to.matched.some((route) => route.meta.auth) && !loggedIn.value) {
    return {
      name: 'login',
    };
  }
};

export const guest: NavigationGuard = (to) => {
  if (to.matched.some((route) => route.meta.guest) && loggedIn.value) {
    return {
      name: 'home',
    };
  }
};

export function registerGuards(router: Router) {
  router.beforeEach(auth);
  router.beforeEach(guest);
}
