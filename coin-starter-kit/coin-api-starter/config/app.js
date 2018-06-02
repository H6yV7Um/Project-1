const { WEB } = require('./local');

module.exports = {
  // 应用端口
  PORT: 3008,
  // 跨域白名单
  ALLOW_ORIGIN: [
    'http://172.20.70.37:3007',
    WEB
  ],
};