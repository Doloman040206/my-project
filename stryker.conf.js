/** @type {import('@stryker-mutator/api/core').StrykerOptions} */
module.exports = {
  mutate: ['app/services/**/*.ts'],
  mutator: 'typescript',
  packageManager: 'npm',
  reporters: ['html', 'clear-text', 'progress'],
  testRunner: 'jest',
  jest: {
    projectType: 'custom',
    config: require('./jest.unit.config.ts'),
  },
  coverageAnalysis: 'perTest',
};