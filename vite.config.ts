import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import generouted from '@generouted/react-router/plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { Mode, plugin } from 'vite-plugin-markdown';
import mdx from '@mdx-js/rollup';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
    generouted(),
    tsconfigPaths(),
    VitePWA({ registerType: 'autoUpdate' }),
    plugin({
      mode: [Mode.MARKDOWN],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  assetsInclude: ['**/*.yml'],
});
