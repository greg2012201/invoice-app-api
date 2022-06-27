module.exports = {
    extends: [
      'prettier',
    ],
    parser: 'babel-eslint',
    parserOptions: {
      sourceType: 'module',
      allowImportExportEverywhere: false,
      codeFrame: true,
    },
    env: {
      node: true,
      es6: true,
    },
    plugins: ['prettier'],
   
  }
  