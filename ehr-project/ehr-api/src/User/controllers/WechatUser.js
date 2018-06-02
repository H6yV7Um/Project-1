const Response = require('../../Response');
const code = require('../code');
const ObjectId = require('mongodb').ObjectId;
// 引入模型层
const WechatUser = require('../models/WechatUser');
const Job = require('../../Recruit/models/Job');


// 获取微信用户
exports.getWechatUser = async (ctx, next) => {
    let data = ctx.request.body.condition,
        userList = null,
        isError = false,
        orderType = data.orderType,
        condition = {},
        pagination = {},
        limit = null,
        skip = null,
        collectionCount = null;
    collectionCount = await WechatUser.count({}, (err, count) => {
        return new Promise((resolve, reject) => {
            resolve(count);
        })
    })
    // 处理查询条件
    // 根据当前状态查询
    condition.state = data.currState == 'all' ? {$gte : 0} : Number(data.currState);
    condition.name = {$regex : data.name};
    if(data.jobType != 'all') {
        condition.jobTypeId = data.jobType;
    }
    // 分页查询  (倒序, 需要接口手动处理skip的数量)
    if(data.skip > collectionCount) {
        limit = data.limit - (data - collectionCount);
        skip = 0;
    }else {
        limit = data.limit;
        skip = data.skip;
    }
    pagination.limit = Number(limit);
    pagination.skip = Number(skip);
    // 查询所有的用户
    userList = await WechatUser.find(condition, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    }).limit(pagination.limit).skip(pagination.skip).sort({delivery_time: orderType == 'desc' ? -1 : 1}).exec();

    let responseData = {},
        hasuserData = true;
    // 判断是否还有数据
    if(userList.length < data.limit) {
        hasuserData = false;
    }

    responseData.userList = userList;
    responseData.hasuserData = hasuserData;

    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, responseData);
    }
}

// 获取微信用户
exports.changeToTimeStamp = async (ctx, next) => {
    let userList = null,
        isError = false;

    // 查询所有的用户
    userList = await WechatUser.find({}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    });

    for(let i = 0;i < userList.length;i++) {
        let result = null;
        if(userList[i].willingposition.length == 24) {
            result = await Job.find({_id : ObjectId(userList[i].willingposition)}, (err, docs) => {
                return docs
            });

            let update = await WechatUser.update(
                {openid : userList[i].openid},
                {jobTypeId : result[0].job_type_id},
                (err, docs) => {
                    if(err) {
                        console.log(err);
                    }else {
                        return docs
                    }
                });
        }
    }

    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, userList);
    }
}

// 查找微信用户
exports.findWechatUserByName = async (ctx, next) => {
    let userList = null,
        isError = false,
        keyword = ctx.query.keyword;
    console.log(keyword)
    // 根据条件查询
    userList = await WechatUser.find({ name: { $regex: keyword}}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, userList);
    }
}

// 将是否签到修改为已经签到
exports.checkIn = async (ctx, next) => {
    let userList = null,
        isError = false,
        updateData = {
            isChecked : true
        },
        data = ctx.request.body;
    // 查询所有的用户
    let result = await WechatUser.update(
        {openid : data.openid},
        updateData,
        (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                console.log(docs)
                return docs.length > 0 ? docs : []
            }
        });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, result);
    }
}

// 将是否签到修改为未签到
exports.unCheckIn = async (ctx, next) => {
    let userList = null,
        isError = false,
        updateData = {
            isChecked : false
        },
        data = ctx.request.body;
    // 查询所有的用户
    let result = await WechatUser.update(
        {openid : data.openid},
        updateData,
        (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length > 0 ? docs : []
            }
        });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, result);
    }
}

// 查询签到状态
exports.isCheckIn = async (ctx, next) => {
    let queryData = ctx.query,
        isError = false,
        res = null,
        status = null;
    // 查询所有的用户
    res = await WechatUser.find({openid : queryData.openid}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                return docs;
            }
        }
    });
    status = res[0].isChecked;
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, {
            isChecked : status
        });
    }
}

// 修改用户的状态
exports.changeState = async (ctx, next) => {
    // 修改用户当前状态
    let request = ctx.request.body,
        isError = false;
    let result = await WechatUser.update(
        {openid : request.openid},
        {state : Number(request.state)},
        (err, docs) => {
            if(err) {
                console.log(err);
                isError = true;
            }else {
                return docs;
            }
        });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, result);
    }
}
