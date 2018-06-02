// 开发者id
export const appid = process.env.NODE_ENV == 'development' ? 'wx3b96ced225ff8eb0' : 'wx2ed7b6878a6226f5';

// 应用链接参数 (由钉钉约束)
export const urlParam = '?dd_nav_bgcolor=FF000000&showmenu=false';
// 生成二维码的hostname
export const hostName = process.env.NODE_ENV == 'development' ? 'http://172.20.70.62:3002' : 'http://ehr.tap4fun.com';