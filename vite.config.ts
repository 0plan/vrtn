import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import generouted from '@generouted/react-router/plugin';
import { VitePWA } from 'vite-plugin-pwa';
import { Mode, plugin } from 'vite-plugin-markdown';
import mdx from '@mdx-js/rollup';
import { managementPages } from './src/console/menu.ts';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    { enforce: 'pre', ...mdx() },
    react(),
    generouted(),
    {
      name: 'spa-page-entries',
      apply: 'build',
      enforce: 'post',
      generateBundle(_options, bundle) {
        const entry = bundle['index.html'];
        if (entry?.type !== 'asset') return;
        // Static hosts can distinguish real SPA routes from missing URLs.
        for (const page of ['login', 'dashboard', '404', ...managementPages.map(page => page.path.slice(1))]) {
          this.emitFile({ type: 'asset', fileName: `${page}.html`, source: entry.source });
        }
      },
    },
    VitePWA({ registerType: 'autoUpdate',
      manifest: {
        name: 'Web Traffic Dashboard',
        short_name: 'Dashboard',
        theme_color: '#404040',
        background_color: '#f7f7f7',
        icons: [{ src: 'favicon.svg', sizes: 'any', type: 'image/svg+xml' }],
      },
      workbox: {
        navigateFallback: null,
        maximumFileSizeToCacheInBytes: 3000000
      }}),
    plugin({
      mode: [Mode.MARKDOWN],
    }),
  ],
  resolve: { tsconfigPaths: true },
  assetsInclude: ['**/*.yml'],
});
