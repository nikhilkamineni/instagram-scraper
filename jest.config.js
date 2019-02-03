module.exports = {
  testEnvironment: 'node',
  testPathIgnorePatterns: ['<rootDir>/node_modules', '<rootDir>/client'],
  coverageDirectory: '<rootDir>/__jest__/coverage',
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html']
};
