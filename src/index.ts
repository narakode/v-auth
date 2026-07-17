import { init } from './auth.js';

export { accessToken, loggedIn, user, meta, login, logout } from './auth.js';
export { registerGuards } from './guards.js';
export { init };

export default {
  install: () => {
    init();
  },
};
