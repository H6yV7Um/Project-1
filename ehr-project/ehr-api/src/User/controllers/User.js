const Response = require('../../Response');
const code = require('../code');
const Dd = require('../../Dd/controllers/Dd');
const Position = require('./Position');
const User = require('../models/User');
const config = require('../../../config/app');
const sha1 = require('sha1');

/**
 * 钉钉登录
 * @param ctx
 * @param next
 */
exports.loginForDd = async (ctx, next) => {
    // 登录钉钉获取钉钉成员信息
    const userInfo = await Dd.login(ctx, ctx.request.body.code);
    if(userInfo.errcode == 0)
    {
        // 刷新access_token
        const time = Date.now();
        const accessToken = sha1(time + Math.random());
        const accessTokenTime = time + config.accessTokenTime;

        // 开发
        if(process.env.NODE_ENV == 'development' && ctx.request.body.isDevelopment)
        {
            userInfo.development_access_token = accessToken;
            ctx.cookies.set('access_token', accessToken, {expires : new Date(time + 1000 * 60 * 60 * 24 * 365)});
        }
        else
        {
            userInfo.access_token = accessToken;
            userInfo.access_token_time = accessTokenTime;
            ctx.cookies.set('access_token', accessToken, {expires : new Date(accessTokenTime)});
        }
        // 更新成员信息
        const user = await this.updateUserInfo(userInfo);
        Response.success(ctx, user);
    }
    else
    {
        Response.error(ctx, code.LOGIN_DD);
    }
}

/**
 * 微信登录
 * @param ctx
 * @param next
 */
exports.loginForWechat = async (ctx, next) => {

}

/**
 * 获取成员信息
 * @param accessToken
 * @returns {*}
 */
exports.getUserInfoForAccessToken = async accessToken => {
    let user = await User.findOne({access_token : accessToken, access_token_time : {$gte : Date.now()}, status : {$gte : 100}});
    if(process.env.NODE_ENV == 'development' && !user)
    {
        // 开发
        user = await User.findOne({development_access_token : accessToken, status : {$gte : 100}});
        if(user)
        {
            user.isDevelopment = true;
        }
    }
    return user;
}

/**
 * 获取成员信息
 * @param ctx
 * @param next
 * @returns {*}
 */
exports.getUserInfo = async (ctx, next) => {
    // 从钉钉更新成员信息
    let user = await Dd.getUserInfo(global.ehr.user.user_id);
    // 开发
    if(!global.ehr.user.isDevelopment)
    {
        // 刷新access_token
        const accessTokenTime = Date.now() + config.accessTokenTime;
        ctx.cookies.set('access_token', ctx.cookies.get('access_token'), {expires : new Date(accessTokenTime)});
        user.access_token_time = accessTokenTime;
    }

    user = await this.updateUserInfo(user);

    Response.success(ctx, user);
}

/**
 * 更新成员信息
 * @param ctx | data:数据
 */
exports.updateUserInfo = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    if(data.userid) data.user_id = data.userid;
    let newUserInfo = {
        user_id : data.user_id,
        name : data.name,
        mobile : data.mobile,
        avatar : data.avatar,
        email : data.email,
        department_ids : [],
        leader_department_ids : []
    };

    // access_token
    if(data.access_token) newUserInfo.access_token = data.access_token;
    if(data.access_token_time) newUserInfo.access_token_time = data.access_token_time;
    if(data.development_access_token) newUserInfo.development_access_token = data.development_access_token;

    // 所属部门ID
    const department_ids = await Dd.getListParentDepts({userId : data.user_id});
    if(department_ids)
    {
        department_ids.map((v1, k1) => {
            v1.map((v2, k2) => {
                if(newUserInfo.department_ids.indexOf(v2) == -1)
                {
                    newUserInfo.department_ids.push(v2);
                }
            })
        })
    }
    // 更新部门
    if(!global.ehr.user.synchronizeDepartmentIds)
    {
        global.ehr.user.synchronizeDepartmentIds = [];
    }
    for(const departmentId of newUserInfo.department_ids)
    {
        if(global.ehr.user.synchronizeDepartmentIds.indexOf(departmentId) == -1)
        {
            global.ehr.user.synchronizeDepartmentIds.push(departmentId);
            Dd.synchronizeDepartment({departmentId});
        }
    }

    // 管理部门ID
    if(data.isLeaderInDepts && data.isLeaderInDepts.length > 2)
    {
        data.isLeaderInDepts.substring(1, data.isLeaderInDepts.length - 1).split(',').map((v, k) => {
            const isLeaderInDepts = v.split(':');
            if(isLeaderInDepts[1] == 'true')
            {
                newUserInfo.leader_department_ids.push(parseInt(isLeaderInDepts[0]));
            }
        })
    }

    // 所属职位ID
    if(data.position) newUserInfo.user_position_id = (await Position.getByName(data.position))._id;

    let user = await User.findOne({user_id : data.user_id, status : {$gte : 100}});
    if(!user)
    {
        // 注册
        const time = Date.now();
        newUserInfo.register_time = time;
        newUserInfo.login_time = time;
        newUserInfo.status = 100;
        user = await User.create(newUserInfo);

        // 尝试关联微信


        // 写入关联表


    }
    else
    {
        // 更新
        newUserInfo.login_time = Date.now();
        user = await User.findByIdAndUpdate(user._id, newUserInfo, {new : true});

        // 更新关联表


    }

    if(ctx.app)
    {
        Response.success(ctx, user);
    }
    else
    {
        return user;
    }
}

/**
 * 获取成员列表
 * @param ctx | data:数据
 * @param isLeader 是否只选管理成员 (true时将只可选自己管理部门成员(包括子部门成员))
 */
exports.get = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let users = [];
    if(data.isLeader)
    {
        users = await User.find({$or : [{user_id : global.ehr.user.user_id}, {department_ids : {$in : global.ehr.user.leader_department_ids}}]});
    }
    else
    {
        users = await User.find();
    }

    if(ctx.app)
    {
        Response.success(ctx, users);
    }
    else
    {
        return users;
    }
}

/**
 * 获取成员(依赖成员ID)
 * @param userId  成员ID
 */
exports.getById = async userId => {
    return await User.findOne({user_id : userId, status : {$gte : 100}});
}

/**
 * 获取成员(依赖成员名)
 * @param name  成员名
 */
exports.getByName = async name => {
    return await User.findOne({name, status : {$gte : 100}});
}

/**
 * 获取leader成员
 * @param userId  成员ID
 */
exports.getLeaders = async userId => {
    let leaders = [];
    const user = await this.getById(userId);
    if(user)
    {
        leaders = await User.find({leader_department_ids : {$in : user.department_ids}, user_id : {$ne : userId}, status : {$gte : 100}});
    }
    return leaders;
}

/**
 * 获取leader成员ID
 * @param userId  成员ID
 */
exports.getLeaderIds = async userId => {
    const leaders = await this.getLeaders(userId);
    return Array.from(leaders, leader => leader.user_id);
}

/**
 * 获取成员数量
 */
exports.getCount = async () => {
    return await User.count({});
}

/**
 * 根据部门id获取部门里面的所有人
 */
exports.getUserByDepartmentID = async (department_id) => {
    return await User.find({"department_ids":{"$all":[department_id]}})
}

