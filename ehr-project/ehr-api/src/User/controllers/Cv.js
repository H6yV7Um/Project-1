const Response = require('../../Response');
const code = require('../code');
const ObjectId = require('mongodb').ObjectId;
// 引入模型层
const Cv = require('../models/Cv');
const Job = require('../../Recruit/models/Job');
const WechatUser = require('../models/WechatUser');

// 添加简历
exports.addCv = async (ctx, next) => {
    let queryData = ctx.request.body;
    console.log(queryData);
    let date = new Date();
    let newCv = new Cv(queryData.cvData),
        newWechatUser = null,
        isError = false,
        cvData = null,
        isAdd = true,
        now = (new Date()).getTime();
        // year = now.getFullYear(),
        // month = now.getMonth()+1,
        // date = now.getDate(),
        // hours = now.getHours(),
        // minutes = now.getMinutes();
    await Cv.find({'phone' : queryData.cvData.phone}, (err, docs) => {
        if(err) {
            isError = true;
        }else {
            if(docs.length != 0) {
                isAdd = false;
                cvData = docs;
            }
        }
    });
    if(isAdd) {
        // 数据库没有该条数据 需要执行添加操作
        cvData = await newCv.save((err, docs) => {
            if(err) {
                isError = true;
            }else {
                return docs;
            }
        });
        if(!isError) {
            // 简历保存成功
            let extraInfo = {
                    resume_id: cvData._id,
                    delivery_time: now,
                    willingposition: cvData.willingposition
                }
            newWechatUser = new WechatUser(Object.assign(queryData.wechatData, queryData.cvData, extraInfo));
            cvData = await newWechatUser.save((err, docs) => {
                if(err) {
                    isError = true;
                }else {
                    cvData = docs;
                }
            });
        }
    }
    if(isError || !isAdd) {
        Response.error(ctx,code.RESUME_ALREADY_EXIST);
    }else {
        Response.success(ctx,cvData);
    }
}

// 更新简历
exports.updateCv = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data)
    // 在用户表中查找该用户
    let res = await WechatUser.find({openid : data.openid}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            // console.log(docs.length)
            return docs.length == 0 ? null : docs
        }
    });
    if(res.length != 0) {
        // 用户存在
        let cvData = await Cv.update(
            {_id : ObjectId(res[0].resume_id)},
            data.resumeData,
            (err, docs) => {
                if(err) {
                    console.log(err);
                }else {
                    console.log(docs)
                    return docs.length > 0 ? docs : []
                }
            });
        let wechatData = await WechatUser.update(
            {openid : data.openid},
            data.resumeData,
            (err, docs) => {
                if(err) {
                    console.log(err);
                }else {
                    console.log(docs)
                    return docs.length > 0 ? docs : []
                }
            });
        // 59cda82dde94ed4ddc84551a
        // console.log(cvData)
        Response.success(ctx, cvData);
    }else{
        Response.error(ctx, code.USER_NOT_EXIST);
    }
}

// 获取简历
exports.getCv = async (ctx, next) => {
    let data = ctx.request.body;
    // 在用户表中查找该用户
    let res = await WechatUser.find({openid : data.openid}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    });
    if(res.length != 0) {
        // 用户存在
        let cvData = await Cv.find({_id : ObjectId(res[0].resume_id)}, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length > 0 ? docs : []
            }
        });
        let JobList = null,
            isError = false,
            id = cvData[0].willingposition;
        JobList = await Job.find({_id : ObjectId(id)}, (err, docs) => {
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
            cvData[0].willingposition = JobList[0].name
        }
        Response.success(ctx, cvData);
    }else{
        Response.error(ctx, code.USER_NOT_EXIST);
    }
}