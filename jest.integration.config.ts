import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/integration/**/*.test.ts', '**/tests/integration/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  testTimeout: 120000,
};

export default config;
