import type { StorybookConfig } from '@storybook/react-vite'
import type { PluginOption } from 'vite'

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-onboarding",
    "@storybook/addon-docs"
  ],

  "framework": {
    "name": "@storybook/react-vite",
    "options": {}
  },

  "staticDirs": ["../public"],

  viteFinal(config){
    // Storybook inherits the app's Vite plugins, but a few are app-only and
    // conflict with Storybook's own pipeline:
    //  - vite-plugin-pwa: Workbox precaching fails on Storybook's large runtime
    //  - @mdx-js/rollup / vite-plugin-markdown: clash with Storybook's own
    //    MDX/Markdown docs handling (@storybook/addon-docs)
    // The tsconfig-paths/react plugins are kept so the "@/" alias still works.
    const isAppOnlyPlugin = (name: string) =>
      name.startsWith('vite-plugin-pwa')
      || name === '@mdx-js/rollup'
      || name === 'vite-plugin-markdown'
    const plugins = (config.plugins ?? []) as unknown[]
    config.plugins = plugins
      .flat(Infinity)
      .filter((plugin) => {
        const name = plugin && typeof plugin === 'object' && 'name' in plugin
          ? (plugin as { name?: unknown }).name
          : undefined
        return typeof name !== 'string' || !isAppOnlyPlugin(name)
      }) as PluginOption[]
    return config
  }
};

export default config;
