const Response = require('./Response');
const User = require('./User/controllers/User');

exports.run = async (ctx, next) => {
    switch (ctx.url.split('/')[2])
    {
        // 不鉴权
        case 'pass':
            await next();
            break;
        // 微信鉴权
        case 'wechat':

            break;
        // 钉钉鉴权
        default:
            if(ctx.cookies.get('access_token'))
            {
                // 鉴权
                const user = await User.getUserInfoForAccessToken(ctx.cookies.get('access_token'));
                if(!user)
                {
                    Response.error(ctx, 1, '请登录');
                }
                else
                {
                    global.ehr.user = user;
                    await next();
                }
            }
            else
            {
                // 未登录
                Response.error(ctx, 1, '请登录');
            }
            break;
    }
}
