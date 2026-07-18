import { init } from './auth';

export {
  accessToken,
  loggedIn,
  user,
  meta,
  login,
  logout,
  isExpired,
} from './auth';
export { registerGuards } from './guards';

export default {
  install: () => {
    init();
  },
};
