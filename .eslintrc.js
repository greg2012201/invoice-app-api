module.exports = {
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: true,
  },
  plugins: ['prettier'],
  env: {
    es2021: true,
    node: true,
  },
  babelOptions: {
    configFile: './.babelrc',
  },
  rules: {
    'no-console': 'off',
  },
};
