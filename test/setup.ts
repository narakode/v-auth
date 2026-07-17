import { vi } from 'vitest';

const locaStorageMock = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: {} as Record<string, any>,
  getItem(key: string) {
    return this.store[key];
  },
};

vi.stubGlobal('localStorage', locaStorageMock);
