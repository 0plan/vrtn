import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import generouted from '@generouted/react-router/plugin';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    generouted(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.yml'],
});
