import { beforeEach, describe, expect, test, vi } from 'vitest';
import {
  _loggedIn,
  accessToken,
  init,
  loggedIn,
  login,
  meta,
  user,
} from './index.js';

beforeEach(() => {
  _loggedIn.value = false;
});

describe('login', () => {
  describe('set logged in state', () => {
    test('sets in memory', () => {
      login('test', {});

      expect(loggedIn.value).toBe(true);
    });

    test('sets in local storage', () => {
      login('test', {});

      expect(localStorage.getItem('logged_in')).toBe('true');
    });
  });

  test('sets access token state', () => {
    const newAccessToken = 'test';

    login(newAccessToken, {});

    expect(accessToken.value).toBe(newAccessToken);
  });

  test('sets user state', () => {
    const newUser = { id: 1, name: 'test' };

    login('test', newUser);

    expect(user.value).toEqual(newUser);
  });

  test('sets meta state', () => {
    const newMeta = { permissions: ['*'] };

    login('test', {}, newMeta);

    expect(meta.value).toEqual(newMeta);
  });
});

describe('init', () => {
  test('sets logged in state from localstorage', () => {
    vi.spyOn(localStorage, 'getItem').mockImplementation(() => 'true');

    init();

    expect(loggedIn.value).toEqual(true);
  });
});
