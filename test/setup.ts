import { vi } from 'vitest';

const locaStorageMock = {
  store: {} as Record<string, string>,
  getItem(key: string) {
    return this.store[key];
  },
  setItem(key: string, value: string) {
    this.store[key] = value;
  },
};

vi.stubGlobal('localStorage', locaStorageMock);
