module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['/node_modules/'],
  testMatch: ['**/tests/**/*.test.(ts)'],
  moduleNameMapper: {
    '@Services': '<rootDir>/src/services',
    '@Services/(.*)': '<rootDir>/src/services/*',
    '@Services/Interfaces': '<rootDir>/src/services/interfaces',
    '@Payloads': '<rootDir>/src/payloads',
    '@Controllers': '<rootDir>/src/controllers',
    '@Decorators': '<rootDir>/src/decorators',
    '@Entities': '<rootDir>/src/entities',
    '@Mappers': '<rootDir>/src/mappers',
    '@Repositories': '<rootDir>/src/repositories',
    '@Middlewares': '<rootDir>/src/middlewares',
    '@Config': '<rootDir>/src/config.ts',
  },
};
