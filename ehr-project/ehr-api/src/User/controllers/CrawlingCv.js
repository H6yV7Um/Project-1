const Response = require('../../Response');
const code = require('../code');
const ObjectId = require('mongodb').ObjectId;
// 引入模型层
const CrawlingCv = require('../models/CrawlingCv');

/**
 * 判断是否是新简历
 * @param ctx | data:数据
 * @param id 简历ID
 */
exports.isNew = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;
    const cv = await CrawlingCv.findOne({id : data.id});

    if(ctx.app)
    {
        Response.success(ctx, cv);
    }
    else
    {
        return cv;
    }
}

/**
 * 更新简历
 * @param ctx | data:数据
 */
exports.update = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;
    let cv = await this.isNew(data);
    if(!cv)
    {
        // 新增
        cv = await CrawlingCv.create(data);
    }
    else
    {
        // 更新
        cv = await CrawlingCv.findByIdAndUpdate(cv._id, data, {new : true});
    }

    if(ctx.app)
    {
        Response.success(ctx, cv);
    }
    else
    {
        return cv;
    }
}

// 添加简历
// exports.addCrawlingCv = async (ctx, next) => {
//     let queryData = ctx.request.body,
//         newCrawlingCv = null,
//         CrawlingCvData = null,
//         isError = false;
//     console.log(queryData);
//
//     newCrawlingCv = new CrawlingCv(queryData);
//     CrawlingCvData = await newCrawlingCv.save((err, docs) => {
//         if(err) {
//             isError = true;
//         }else {
//             CrawlingCvData = docs;
//         }
//     });
//
//     console.log(CrawlingCvData)
//     if(isError) {
//         Response.error(ctx,code.RESUME_ALREADY_EXIST);
//     }else {
//         Response.success(ctx,CrawlingCvData);
//     }
// }

// 获取简历列表
exports.getCv = async ctx => {
        let cvData = await CrawlingCv.find({}, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length > 0 ? docs : []
            }
        });
        console.log(cvData);
        Response.success(ctx, cvData);
}
//通过ID获取简历详细信息
exports.getCvById = async ctx => {
    let data = ctx.request.body;
    if(ctx.app) data = ctx.request.body;
    let cvData = await CrawlingCv.find({id : data.id}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length > 0 ? docs : []
        }
    });
    console.log(cvData);
    Response.success(ctx, cvData);
}
//通过ID获取简历详细信息
exports.getCvByConditon = async ctx => {
    let data = ctx.request.body;
    if(ctx.app) data = ctx.request.body;
    let cvData = await CrawlingCv.find({"$or":[{'personal_info.name':{$regex:data.val}},
        {'personal_info.location':{$regex:data.val} },
        {'personal_info.position':{$regex:data.val} },
        {'work_experience.work_company':{$regex:data.val}},
        {'personal_info.education':{$regex:data.val}}
    ]}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length > 0 ? docs : []
        }
    });
    console.log(cvData);
    Response.success(ctx, cvData);
}
