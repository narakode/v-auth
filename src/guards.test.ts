import { beforeEach, describe, expect, test, vi } from 'vitest';
import { auth } from './guards.js';
import type { RouteLocationNormalized } from 'vue-router';
import { _loggedIn } from './index.js';

beforeEach(() => (_loggedIn.value = false));

describe('auth', () => {
  describe('as guest', () => {
    test('return /login when require auth', () => {
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

    test('return none when not require auth', () => {
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

  describe('as user', () => {
    test('return none when require auth', () => {
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
});
