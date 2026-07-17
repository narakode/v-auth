import { beforeEach, describe, expect, test, vi } from 'vitest';
import { auth, guest } from './guards.js';
import type { RouteLocationNormalized } from 'vue-router';
import { _loggedIn } from './index.js';

beforeEach(() => (_loggedIn.value = false));

describe('auth', () => {
  describe('when require auth', () => {
    test('return login when not logged in', () => {
      const to = {
        matched: [
          {
            meta: {
              auth: true,
            },
          },
        ],
      };

      expect(
        auth(
          to as unknown as RouteLocationNormalized,
          {} as RouteLocationNormalized,
          vi.fn(),
        ),
      ).toEqual({ name: 'login' });
    });

    test('continue when logged in', () => {
      _loggedIn.value = true;

      const to = {
        matched: [
          {
            meta: {
              auth: true,
            },
          },
        ],
      };

      expect(
        auth(
          to as unknown as RouteLocationNormalized,
          {} as RouteLocationNormalized,
          vi.fn(),
        ),
      ).toBeUndefined();
    });
  });

  test('continue when not require auth', () => {
    const to = {
      matched: [],
    };

    expect(
      auth(
        to as unknown as RouteLocationNormalized,
        {} as RouteLocationNormalized,
        vi.fn(),
      ),
    ).toBeUndefined();
  });
});

describe('guest', () => {
  describe('when require guest', () => {
    test('return home when logged in', () => {
      _loggedIn.value = true;

      const to = {
        matched: [
          {
            meta: {
              guest: true,
            },
          },
        ],
      };

      expect(
        guest(
          to as unknown as RouteLocationNormalized,
          {} as RouteLocationNormalized,
          vi.fn(),
        ),
      ).toEqual({ name: 'home' });
    });

    test('continue when not logged in', () => {
      const to = {
        matched: [
          {
            meta: {
              guest: true,
            },
          },
        ],
      };

      expect(
        guest(
          to as unknown as RouteLocationNormalized,
          {} as RouteLocationNormalized,
          vi.fn(),
        ),
      ).toBeUndefined();
    });
  });

  test('continue when not require guest', () => {
    _loggedIn.value = true;

    const to = {
      matched: [],
    };

    expect(
      guest(
        to as unknown as RouteLocationNormalized,
        {} as RouteLocationNormalized,
        vi.fn(),
      ),
    ).toBeUndefined();
  });
});
