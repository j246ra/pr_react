const path = require('path');
const paths = require('../config/paths');

module.exports = async ({ config }) => {
  // 他の設定...

  // resolve.alias の設定を追加
  config.resolve.alias = {
    ...config.resolve.alias,
    '@src': paths.appSrc,
    '@lib': path.resolve(paths.appSrc, 'lib'),
    '@providers': path.resolve(paths.appSrc, 'providers'),
    '@validators': path.resolve(paths.appSrc, 'validators'),
    '@session': path.resolve(paths.appSrc, 'components/session'),
    '@lifelog': path.resolve(paths.appSrc, 'components/lifelog'),
    // 他のエイリアス設定がある場合はここに追加します
  };

  // 他の設定...

  return config;
};
