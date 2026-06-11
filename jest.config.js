/**
 * @returns {Promise<import('jest').Config>}
 */
module.exports = {
  transform: {
    "^.+\\.m?[jt]sx?$": ["@swc/jest"],
  },
  transformIgnorePatterns: ["/node_modules/(?!@openmrs|.+\\.pnp\\.[^\\/]+$)"],
  moduleNameMapper: {
    "@openmrs/esm-framework": "@openmrs/esm-framework/mock",
    "@openmrs/esm-utils": "@openmrs/esm-framework/mock",
    "\\.(s?css)$": "identity-obj-proxy",
    "^lodash-es/(.*)$": "lodash/$1",
    "^uuid$": "<rootDir>/node_modules/uuid/dist/index.js",
    "^dexie$": require.resolve("dexie"),
  },
  collectCoverageFrom: [
    "**/src/**/*.component.tsx",
    "!**/node_modules/**",
    "!**/vendor/**",
    "!**/src/**/*.test.*",
    "!**/src/declarations.d.tsx",
    "!**/e2e/**",
  ],
  setupFilesAfterEnv: ["<rootDir>/src/setup-tests.ts"],
  testPathIgnorePatterns: [
    "<rootDir>/packages/esm-form-entry-app",
    "<rootDir>/e2e",
  ],
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    url: "http://localhost/",
  },
};
