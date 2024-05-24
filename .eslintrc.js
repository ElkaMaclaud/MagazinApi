module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/no-redeclare": ["error", { ignoreClasses: true }], //- В новой версии TS
    // нельзя объединять класс и интерфейс с одинак. названием, но лучше так не делать - это временное решение
    // Лучше дать разные названия:
    // - export interface НАЗВАНИЕ_ИНТЕРФЕЙСА extends Base {}
    // - export class НАЗВАНИЕ_КЛАССА extends TimeStamps implements НАЗВАНИЕ_ИНТЕРФЕЙСА {
    // Позже можно поменять на новый подход, пока оставлю так!
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
  },
};
