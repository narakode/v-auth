import { ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type User = Record<string, any>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Meta = Record<string, any>;

export const loggedIn = ref(false);
export const accessToken = ref<string | null>();
export const user = ref<User>();
export const meta = ref<Meta>();

export function login(newAccessToken: string, newUser: User, newMeta?: Meta) {
  loggedIn.value = true;
  accessToken.value = newAccessToken;
  user.value = newUser;
  meta.value = newMeta;

  localStorage.setItem('logged_in', `${loggedIn.value}`);
}

export function init() {
  loggedIn.value = localStorage.getItem('logged_in') === 'true';
}
