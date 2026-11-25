import * as path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
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
    VitePWA({ registerType: 'autoUpdate',
      manifest: {
        theme_color: '#404040',
        background_color: '#f7f7f7',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000
      }}),
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
