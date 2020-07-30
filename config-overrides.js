// eslint-disable-next-line import/no-extraneous-dependencies
const { useBabelRc, override, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
  useBabelRc(),
  addWebpackAlias({
    '@constants': path.resolve(__dirname, './src/constants'),
    '@sharedComponents': path.resolve(__dirname, './src/components'),
    '@services': path.resolve(__dirname, './src/services'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@HOCs': path.resolve(__dirname, './src/HOCs'),
    '@images': path.resolve(__dirname, './src/images'),
    '@src': path.resolve(__dirname, './src'),
  })
);
