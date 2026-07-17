import { readonly, ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type User = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Meta = Record<string, any>;

export const _loggedIn = ref(false);

const _accessToken = ref<string | null>();
const _user = ref<User | null>();
const _meta = ref<Meta | null>();

export const loggedIn = readonly(_loggedIn);
export const accessToken = readonly(_accessToken);
export const user = readonly(_user);
export const meta = readonly(_meta);

export function init() {
  _loggedIn.value = localStorage.getItem('logged_in') === 'true';
}

export function login(accessToken: string, user: User, meta?: Meta) {
  _loggedIn.value = true;
  _accessToken.value = accessToken;
  _user.value = user;
  _meta.value = meta;

  localStorage.setItem('logged_in', `${_loggedIn.value}`);
}

export function logout() {
  _loggedIn.value = false;
  _accessToken.value = null;
  _user.value = null;
  _meta.value = null;

  localStorage.setItem('logged_in', `${_loggedIn.value}`);
}
