process.env.TZ = "UTC";

const jestConfig = {
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules", "dist"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFilesAfterEnv: ["./jest/jest.setup.ts", "./jest/helpers.ts"],
  moduleDirectories: ["node_modules", "src"],
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.test.json",
    },
  },
};

export default jestConfig;
