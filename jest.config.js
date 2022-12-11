module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(\\.|/)(test|spec)\\.tsx?$",
  testPathIgnorePatterns: [
    "(\\.|/)(integration.test|integration.spec)\\.tsx?$",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  coverageReporters: ["json-summary", "text", "lcov"],
  collectCoverage: true,
};
