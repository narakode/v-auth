import { describe, expect, test } from 'vitest';
import { accessToken, loggedIn, login, meta, user } from './index.js';

describe('login', () => {
  test('set logged in state', () => {
    login('test', {});

    expect(loggedIn.value).toBe(true);
  });

  test('set access token state', () => {
    const newAccessToken = 'test';

    login(newAccessToken, {});

    expect(accessToken.value).toBe(newAccessToken);
  });

  test('set user state', () => {
    const newUser = { id: 1, name: 'test' };

    login('test', newUser);

    expect(user.value).toEqual(newUser);
  });

  test('set meta state', () => {
    const newMeta = { permissions: ['*'] };

    login('test', {}, newMeta);

    expect(meta.value).toEqual(newMeta);
  });
});
