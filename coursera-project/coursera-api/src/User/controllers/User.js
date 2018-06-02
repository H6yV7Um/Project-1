const Response = require('../../Response');
const code = require('../code');
const Request = require('../../../utils/Request');
const API = require('../../../config/api');
const Department = require('./Department');
const Position = require('./Position');
const User = require('../models/User');

/**
 * 登录
 * @param ctx
 * @param next
 */
exports.login = async (ctx, next) => {
    let userInfo = await Request.post({code : ctx.request.body.code}, API.DD_LOGIN, API.HEADER);
    console.log(userInfo)
      if(userInfo.status.code == 0)
    {
        // 请求token
        if(userInfo.data.access_token)
        {
            ctx.cookies.set('access_token', userInfo.data.access_token, {expires : new Date(userInfo.data.access_token_time)});
        }

        // 更新成员信息
        userInfo = await updateUserInfo(userInfo.data);
        Response.success(ctx, userInfo);
    }
    else
    {
        Response.error(ctx, code.LOGIN_ERROR);
    }
}

/**
 * 检测成员
 * @param accessToken
 * @returns {*}
 */
exports.checkUser = async accessToken => {
    return await User.findOne({access_token : accessToken, access_token_time : {$gte : Date.now()}, status : {$gte : 100}});
}

/**
 * 获取成员信息
 * @param ctx
 * @param next
 * @returns {*}
 */
exports.getUserInfo = async (ctx, next) => {
    let userInfo = await Request.post({access_token : ctx.cookies.get('access_token')}, API.DD_GET_USER_INFO, API.HEADER);

    if(userInfo.status.code == 0)
    {
        // 请求token
        if(userInfo.data.access_token)
        {
            ctx.cookies.set('access_token', userInfo.data.access_token, {expires : new Date(userInfo.data.access_token_time)});
        }

        // 更新成员信息
        userInfo = await updateUserInfo(userInfo.data);
        Response.success(ctx, userInfo);
    }
    else
    {
        Response.error(ctx, code.LOGIN);
    }
}

/**
 * 同步组织架构
 * @param ctx
 * @param next
 */
exports.synchronizeUsers = async (ctx, next) => {
    let usersInfo = await Request.post({access_token : ctx.cookies.get('access_token')}, API.DD_GET_USERS_INFO, API.HEADER);

    if(usersInfo.status.code == 0)
    {
        let users = [];
        let departmentIds = [];
        for(let userInfo of usersInfo.data)
        {
            // 更新成员信息
            userInfo = await updateUserInfo(userInfo, false);
            for(const departmentId of userInfo.department_ids)
            {
                if(departmentIds.indexOf(departmentId) == -1)
                {
                    departmentIds.push(departmentId);
                }
            }
            users.push(userInfo);
        }

        // 更新部门信息
        Department.updateForIds({department_ids : departmentIds});

        Response.success(ctx, users);
    }
    else
    {
        Response.error(ctx, code.LOGIN);
    }
}

/**
 * 更新成员信息
 * @param userInfo 成员信息
 * @param isUpdateDepartment 是否更新部门信息
 */
const updateUserInfo = async (userInfo, isUpdateDepartment=true) => {
    if(userInfo.userid) userInfo.user_id = userInfo.userid;

    let newUserInfo = {
        user_id : userInfo.user_id,
        name : userInfo.name,
        mobile : userInfo.mobile,
        avatar : userInfo.avatar,
        email : userInfo.email,
        department_ids : userInfo.department_ids,
        leader_department_ids : userInfo.leader_department_ids
    };

    // 请求token
    if(userInfo.access_token) newUserInfo.access_token = userInfo.access_token;
    if(userInfo.access_token_time) newUserInfo.access_token_time = userInfo.access_token_time;

    // 所属职位ID
    if(userInfo.position) newUserInfo.user_position_id = (await Position.getByName(userInfo.position))._id;

    let user = await User.findOne({user_id : newUserInfo.user_id, status : {$gte : 100}});
    if(!user)
    {
        // 注册
        const time = Date.now();
        newUserInfo.register_time = time;
        newUserInfo.login_time = time;
        newUserInfo.status = 100;
        newUserInfo = await User.create(newUserInfo);

        // 写入关联表


    }
    else
    {
        // 更新
        newUserInfo.login_time = Date.now();
        newUserInfo = await User.findByIdAndUpdate(user._id, newUserInfo, {new : true});

        // 更新关联表


    }

    // 更新部门信息
    if(isUpdateDepartment)
    {
        Department.updateForIds({department_ids : newUserInfo.department_ids});
    }

    return newUserInfo;
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
        users = await User.find({$or : [{user_id : global.coursera.user.user_id}, {department_ids : {$in : global.coursera.user.leader_department_ids}}]});
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

