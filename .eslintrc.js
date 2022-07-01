module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  env: {
    es2021: true,
    node: true,
  },
  rules: {
    'no-console': 'off',
  },
};
