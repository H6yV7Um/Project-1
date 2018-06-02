const Response = require('../../Response');
const code = require('../code');
const ObjectId = require('mongodb').ObjectId;
// 引入模型层
const Job = require('../models/Job');
const JobType = require('../models/JobType');

// 获取职位列表
exports.getJob = async (ctx, next) => {
    let JobList = null,
        isError = false;
    // 查询是否有该数据
    JobList = await Job.find({}, (err, docs) => {
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
        Response.success(ctx, JobList);
    }
}

// 删除指定的职位
exports.deleteJob = async (ctx, next) => {
    let data = ctx.request.body,
        isError = false,
        JobList = null;
    // 查询是否有该数据
    JobList = await Job.remove({_id : data._id}, (err, docs) => {
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
        Response.success(ctx, JobList);
    }
}

// 添加职位列表
exports.addJob = async (ctx, next) => {
    let data = ctx.request.body,
        newJob = new Job(data.data),
        JobData = null,
        isError = false;
    JobData = await newJob.save((err, docs) => {
        if(err) {
            isError = true;
        }else {
            return docs;
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, JobData);
    }
}

// 添加职位分类
exports.addJobType = async (ctx, next) => {
    let data = ctx.request.body,
        JobTypeData = null,
        newJobType = null,
        isError = false;
    newJobType = new JobType(data.name),
    JobTypeData = await newJobType.save((err, docs) => {
        if(err) {
            isError = true;
        }else {
            return docs;
        }
    });
    if(isError) {
        Response.error(ctx, code.USER_NOT_EXIST);
    }else {
        Response.success(ctx, JobTypeData);
    }
}

// 得到所有的职位分类
exports.getJobType = async (ctx, next) => {
    let JobTypeList = null,
        isError = false;
    // 查询是否有该数据
    JobTypeList = await JobType.find({}, (err, docs) => {
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
        Response.success(ctx, JobTypeList);
    }
}

// 删除指定的职位类别
exports.deleteJobType = async (ctx, next) => {
    let data = ctx.request.body,
        isError = false;
    // 查询是否有该数据
    JobTypeList = await JobType.remove({_id : data._id}, (err, docs) => {
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
        Response.success(ctx, JobTypeList);
    }
}

// 根据职位id获取职位名称
exports.getJobById = async (ctx, next) => {
    let JobList = null,
        isError = false,
        id = ctx.query.id;
    // 查询是否有该数据
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
        Response.success(ctx, JobList);
    }
}