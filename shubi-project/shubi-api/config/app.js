const { WEB } = require('./local');

module.exports = {
  // 应用端口
  PORT: 3002,
  // 跨域白名单
  ALLOW_ORIGIN: [
    'https://hox.com',
    'https://www.hox.com',
    'https://api.hox.com',
    'http://172.20.70.37:3001',
    WEB
  ],
};