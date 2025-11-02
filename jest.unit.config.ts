import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/*.test.ts', '**/tests/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
};

export default config;