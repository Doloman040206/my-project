import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/e2e/**/*.test.ts', '**/tests/e2e/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testTimeout: 180000,
};

export default config;