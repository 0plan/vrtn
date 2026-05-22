import { createDefaultPreset } from "ts-jest";

const tsJestPreset = createDefaultPreset();

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    ...tsJestPreset.transform,
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/tsconfig.json',
      diagnostics: {
        warnOnly: true, // Treat TypeScript diagnostics as warnings instead of errors
      },
    }],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '@generouted/react-router/client': '<rootDir>/src/__mocks__/@generouted/react-router/client',
  },
  testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)',
  ],
};