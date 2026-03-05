import type { StorybookConfig } from '@storybook/react-vite'

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

  viteFinal(config){
    // Add other configuration here depending on your use case
    return config
  }
};

export default config;
