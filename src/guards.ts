import type { NavigationGuard } from 'vue-router';
import { loggedIn } from './index.js';

export const auth: NavigationGuard = (to) => {
  if (to.matched.some((route) => route.meta.auth) && !loggedIn.value) {
    return {
      name: 'login',
    };
  }
};
