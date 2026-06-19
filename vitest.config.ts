import * as path from 'path';
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Standalone config so the app-only Vite plugins (PWA, generouted, mdx,
// markdown) don't run during unit tests.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.tsx', 'src/**/*.{test,spec}.{ts,tsx}'],
    },
  },
});
