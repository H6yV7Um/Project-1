let configLocal = null;
if (process.env.NODE_ENV === 'development') {
    configLocal = require('config/local')
}

// 应用配置
export default {
    // 钉钉企业ID
    DD_CORP_ID: process.env.NODE_ENV === 'development' ? 'ding62f0026aee87771035c2f4657eb6378f' : 'ding055f194a57d1af67',
    // 获取钉钉微应用ID
    DD_GET_AGENT_ID: () => {
        let agentId = null
        // 开发
        if (process.env.NODE_ENV === 'development') {
            agentId = configLocal.agentId
        } else { // 发布
            agentId = '157412755'
        }
        return agentId
    },
    // 钉钉应用链接参数 (由钉钉约束)
    DD_URL_PARAM: '?dd_nav_bgcolor=FF000000&showmenu=false'
}
