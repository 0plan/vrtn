import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Unmount React trees after every test to keep the jsdom DOM clean.
afterEach(() => {
  cleanup();
});
