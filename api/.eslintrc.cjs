module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "prettier",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  plugins: [
    "@typescript-eslint"
  ],
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 2020
  },
  env: {
    browser: false,
    es2017: true,
    node: true
  }
};
