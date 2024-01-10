module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended',
    'eslint-config-airbnb'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 6, 'sourceType': 'module', 'ecmaFeatures': {
      'jsx': true
    }
  },
  "settings": {
    "import/resolver": {
      "alias": {
        map: [
          [ "@components", "./src/components" ],
          [ "~", "./src" ],
        ]
      }
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'no-shadow': 0,
    'no-unresolved': 0,
    'react/prefer-stateless-function': 0,
    'react/jsx-one-expression-per-line': 0
  }
}
