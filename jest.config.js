/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  verbose: true,
  preset: 'jest-expo',
  testPathIgnorePatterns: [
    '/node_modules',
    '/android',
    '/ios'
  ],
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    'jest-styled-components'
  ]
};

module.exports = config;
