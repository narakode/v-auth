import { init } from './auth.js';

export {
  accessToken,
  loggedIn,
  user,
  meta,
  login,
  logout,
  isExpired,
} from './auth.js';
export { registerGuards } from './guards.js';

export default {
  install: () => {
    init();
  },
};
