module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'plugin:storybook/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    'ecmaVersion': 6, 'sourceType': 'module', 'ecmaFeatures': {
      'jsx': true
    }
  },
  plugins: ['react-refresh'],
  rules: {
    'import/prefer-default-export': ['off'], // export const 문을 쓸때 에러를 내는 규칙 해제
    'no-console': ['off'], // 콘솔을 쓰면 에러가 나던 규칙 해제
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'react/jsx-filename-extension': 0,
    'react/react-in-jsx-scope': 0,
    'no-shadow': 0,
    'no-unresolved': 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-one-expression-per-line": 0
  }
}
