const Response = require('../../Response');
const XLSX = require('xlsx');
const Busboy = require('busboy');
const Okr = require('../models/Okr');
const User = require('../../User/controllers/User');
const Position = require('../../User/controllers/Position');
const okrConfig = require('../../../config/okr');
// const getById = require('../../User/controllers/User')

/**
 * 导入流程
 * @param ctx
 * @param next
 * @return {*}
 */
exports.import = async (ctx, next) => {
    const busboy = new Busboy({headers : ctx.req.headers});

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        let fileDate = null;
        file.on('data', data => {
            fileDate = fileDate == null ? data : Buffer.concat([fileDate, data]);
        })

        file.on('end', async () => {
            // console.log('File [' + fieldname + '] got ' + fileDate.length + ' bytes');

            const workbook = XLSX.read(fileDate);
            // 表格列表
            const sheetNames = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheetNames[0]];

            let okr = null;
            const dateNow = Date.now();
            for(let i = 2; i <= parseInt(worksheet['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1]); i++)
            {
                // 新记录
                if(worksheet[`A${i}`] && worksheet[`B${i}`])
                {
                    // 存入上一记录
                    if(okr)
                    {
                        // console.log('\n');
                        // console.log(okr);
                        okr = await this.update(okr);
                        // console.log('\n');
                        // console.log(okr);
                    }

                    // 获取成员
                    const user = await User.getByName(worksheet[`A${i}`].v);
                    if(user)
                    {
                        // console.log('\n')
                        // console.log(user)
                        okr = {
                            // 员工ID
                            user_id : user.user_id,
                            // 员工名字
                            name : user.name,
                            // 员工头像
                            avatar : user.avatar,
                            // 部门ID
                            department_ids : user.department_ids,
                            // 可见部门ID集合
                            authority_department_ids : user.department_ids,
                            // 属性
                            attr : {type : 20},
                            // okr
                            okrs : [],
                            // 反馈
                            feedbacks : []
                        }

                        // 期望完成时间
                        let expectedTime = worksheet[`B${i}`].v.split('_');
                        if(expectedTime.length == 1) expectedTime.push(2);

                        // 年份
                        okr.attr.year = parseInt(expectedTime[0]);
                        switch (parseInt(expectedTime[1]))
                        {
                            // 上半年(6月30日)
                            case 1:
                                expectedTime = `${expectedTime[0]}-${okrConfig.firstHalfYearDate}`;
                                okr.attr.stage = 1;
                                break;
                            // 下半年(12月31日)
                            default:
                                expectedTime = `${parseInt(expectedTime[0])}-${okrConfig.secondHalfYearDate}`;
                                okr.attr.stage = 2;
                                break;
                        }
                        okr.expected_time = Date.parse(new Date(expectedTime));

                        // 状态
                        okr.status = worksheet[`N${i}`] && worksheet[`N${i}`].v == '是' ? 200 : 100;

                        // 实际完成时间
                        if(okr.status == 200)
                        {
                            okr.completed_time = dateNow;
                        }
                    }
                    else
                    {
                        okr = null;
                    }
                }

                if(okr != null)
                {
                    // 目标
                    if(worksheet[`C${i}`])
                    {
                        okr.okrs.push({objective : worksheet[`C${i}`].v});
                    }
                    // 关键结果
                    if(worksheet[`D${i}`] && okr.okrs.length > 0)
                    {
                        if(!okr.okrs[okr.okrs.length - 1].krs) okr.okrs[okr.okrs.length - 1].krs = [];
                        okr.okrs[okr.okrs.length - 1].krs.push(worksheet[`D${i}`].v);
                    }

                    // 反馈
                    if(worksheet[`E${i}`])
                    {
                        okr.feedbacks.push(
                            {
                                stage : worksheet[`E${i}`].v,
                                okrs : [],
                                questions : [],
                                achievements : [],
                                comment_info : {comments : []}
                            }
                        );

                        // 期望反馈时间
                        switch (worksheet[`E${i}`].v)
                        {
                            // Q1 || Q3
                            case 1:
                                okr.feedbacks[okr.feedbacks.length-1].expected_time = Date.parse(new Date(`${okr.attr.year}-${okr.attr.stage == 1 ? okrConfig.firstHalfYearFirstFeedback : okrConfig.secondHalfYearFirstFeedback}`));
                                break;
                            // Q2 || Q4
                            default :
                                okr.feedbacks[okr.feedbacks.length-1].expected_time = Date.parse(new Date(`${okr.attr.year}-${okr.attr.stage == 1 ? okrConfig.firstHalfYearSecondFeedback : okrConfig.secondHalfYearSecondFeedback}`));
                                break;
                        }

                        // 反馈描述
                        if(worksheet[`G${i}`])
                        {
                            okr.feedbacks[okr.feedbacks.length-1].describe = worksheet[`G${i}`].v;
                            // 实际反馈时间
                            okr.feedbacks[okr.feedbacks.length-1].completed_time = dateNow;
                        }

                        // 工作成果得分
                        if(worksheet[`J${i}`])
                        {
                            const achievementScore = parseInt(worksheet[`J${i}`].v);
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments.push({achievement_score : achievementScore, score : achievementScore * okrConfig.achievementScoreScale});
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.achievement_score = achievementScore;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.score = Math.floor(achievementScore * okrConfig.achievementScoreScale * 10) / 10;
                        }

                        // 工作过程得分
                        if(worksheet[`K${i}`])
                        {
                            const processScore = parseInt(worksheet[`K${i}`].v);
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].process_score = processScore;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].score += processScore * okrConfig.processScoreScale;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.process_score = processScore;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.score += processScore * okrConfig.processScoreScale;
                        }

                        // 综合得分
                        if(worksheet[`L${i}`])
                        {
                            const compositeScore = parseInt(worksheet[`L${i}`].v);
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].composite_score = compositeScore;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].score += compositeScore * okrConfig.compositeScoreScale;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.composite_score = compositeScore;
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.score += compositeScore * okrConfig.compositeScoreScale;
                        }

                        okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].score = Math.floor(okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].score * 10) / 10;
                        okr.feedbacks[okr.feedbacks.length-1].comment_info.score = Math.floor(okr.feedbacks[okr.feedbacks.length-1].comment_info.score * 10) / 10;

                        // 评分时间
                        okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].create_time = dateNow;
                        okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].update_time = dateNow;
                        okr.feedbacks[okr.feedbacks.length-1].comment_info.update_time = dateNow;

                        // 直接leader评价
                        if(worksheet[`M${i}`])
                        {
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].comment = worksheet[`M${i}`].v;
                        }

                        // 评价人
                        const leaderIds = await User.getLeaderIds(okr.user_id);
                        if(leaderIds.length > 0)
                        {
                            okr.feedbacks[okr.feedbacks.length-1].comment_info.comments[0].user_id = leaderIds[0];
                        }
                    }

                    // OKR反馈
                    if(worksheet[`F${i}`])
                    {
                        okr.feedbacks[okr.feedbacks.length-1].okrs.push(worksheet[`F${i}`].v);
                    }
                    else if(okr.feedbacks[okr.feedbacks.length-1].okrs.length < okr.okrs.length)
                    {
                        okr.feedbacks[okr.feedbacks.length-1].okrs.push('');
                    }

                    // 反馈问题
                    if(worksheet[`H${i}`])
                    {
                        okr.feedbacks[okr.feedbacks.length-1].questions.push({describe : worksheet[`H${i}`].v});
                    }

                    // 反馈成果
                    if(worksheet[`I${i}`])
                    {
                        okr.feedbacks[okr.feedbacks.length-1].achievements.push({describe : worksheet[`I${i}`].v});
                    }
                }
            }
            // 存入末记录
            if(okr)
            {
                // console.log('\n');
                // console.log(okr);
                okr = await this.update(okr);
                // console.log('\n');
                // console.log(okr);
            }
        });
    })

    busboy.on('error', err => {
        console.log(err);
    })

    Response.success(ctx, {});

    return ctx.req.pipe(busboy);
}

/**
 * 新增
 * @param ctx | data: OKR数据
 */
exports.add = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 新增时间
    data.create_time = Date.now();
    const okr = await Okr.create(data);

    if(ctx.app)
    {
        Response.success(ctx, okr);
    }
    else
    {
        return okr;
    }
}

/**
 * 编辑
 * @param ctx | data: OKR数据
 * @param _id OKR主键
 */
exports.edit = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 编辑时间
    data.update_time = Date.now();
    const okr = await Okr.findByIdAndUpdate(data._id, data, {new : true});

    if(ctx.app)
    {
        Response.success(ctx, okr);
    }
    else
    {
        return okr;
    }
}

/**
 * 更新
 * @param ctx | data: OKR数据
 * @param user_id 成员ID
 * @param attr.type 分类
 * @param attr.year 年份
 * @param attr.stage 阶段
 */
exports.update = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let okr = await Okr.findOne({user_id : data.user_id, 'attr.type' : data.attr.type, 'attr.year' : data.attr.year, 'attr.stage' : data.attr.stage, status : {$gt : 0}});
    if(okr)
    {
        data._id = okr._id;
        okr = this.edit(data);
    }
    else
    {
        okr = this.add(data);
    }

    if(ctx.app)
    {
        Response.success(ctx, okr);
    }
    else
    {
        return okr;
    }
}

/**
 * 获取OKR
 * @param ctx | data
 * @param id  主键
 * @param feedbackId  反馈ID
 * @param userId  成员ID
 * @param userIds  成员ID数组
 * @param date  起止日期(闭区间) 如[2016, 2017]
 * @param sort  排序规则
 * @param page  页数
 * @param limit  获取条数
 * @param isGetUserInfo  是否获取成员信息(默认:false)
 * @param isGetFeedbackDetail  是否获取反馈详情(默认:false)
 * @return 不分页:[{OKR}]  分页:{isGetAll:是否获取完, okrs:[{OKR}]}
 */
exports.get = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let okrs = [];
    let condition = {status : {$gt : 0}};
    // 条件:主键
    if(data.id)
    {
        condition._id = data.id;
    }
    // 条件:反馈ID
    if(data.feedbackId)
    {
        condition['feedbacks._id'] = data.feedbackId;
    }
    // 条件:单个发布人ID
    if(data.userId)
    {
        if(Object.prototype.toString.call(data.userId) == '[object Array]')
        {
            condition.user_id = {$in : data.userId};
        }
        else
        {
            condition.user_id = data.userId;
        }
    }
    // 条件:多个发布人ID
    if(data.userIds)
    {
        condition.user_id = {$in : data.userIds};
    }
    // 条件:起止日期(闭区间) 如[2016, 2017]
    if(data.date)
    {
        if(Object.prototype.toString.call(data.date) == '[object Array]' && data.date.length == 2)
        {
            condition['attr.year'] = {$gte : data.date[0], $lte : data.date[1]};
        }
    }

    // 获取字段

    // 排序
    const sort = data.sort || {expected_time : 'desc', user_id : 'desc'};

    // 获取
    let isGetAll = null;
    if(data.page)
    {
        // 分页
        const limit = parseInt(data.limit) || 10;
        okrs = await Okr.find(condition).sort(sort).skip(limit * (data.page - 1)).limit(limit + 1);
        // 未取尽
        if(okrs.length == limit + 1)
        {
            isGetAll = false;
            okrs.splice(limit, 1);
        }
        else
        {
            isGetAll = true;
        }
    }
    else
    {
        okrs = await Okr.find(condition).sort(sort);
    }

    // 验权(wait)


    for(let k=0; k<okrs.length; k++)
    {
        // 获取成员信息
        if(data.isGetUserInfo)
        {
            const user = await User.getById(okrs[k].user_id);
            okrs[k]._doc.position = (await Position.get({id : user.user_position_id})).name;
        }
        // 获取反馈详情
        if(data.isGetFeedbackDetail)
        {
            for(let i=0; i<okrs[k].feedbacks.length; i++)
            {
                if(!data.feedbackId || okrs[k].feedbacks[i]._id == data.feedbackId)
                {
                    for(let j=0; j<okrs[k].feedbacks[i].comment_info.comments.length; j++)
                    {
                        const commenter = await User.getById(okrs[k].feedbacks[i].comment_info.comments[j].user_id);
                        okrs[k].feedbacks[i].comment_info.comments[j]._doc.name = commenter.name;
                        okrs[k].feedbacks[i].comment_info.comments[j]._doc.avatar = commenter.avatar;
                    }
                }
            }
        }
    }

    // 单条返回
    if((data.id || data.feedbackId) && okrs.length == 1)
    {
        okrs = okrs[0];
    }
    else
    {
        // 分页是否取尽
        if(isGetAll === true || isGetAll === false)
        {
            okrs = {okrs, isGetAll};
        }
    }

    if(ctx.app)
    {
        Response.success(ctx, okrs);
    }
    else
    {
        return okrs;
    }
}


/**
 * 获取OKR分数
 * @param id  主键
 * @param userId  成员ID
 * @param period  时段 [年份, 阶段1, 阶段2]
 */
exports.getScore = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let scoreInfo = await Okr.find({user_id : data.userId, 'attr.year' : data.period[0], 'attr.stage' : data.period[1]});
    let scores = {};

    for(let i = 0 ; i < scoreInfo.length; i++) {
        for(let j = 0 ; j < scoreInfo[i].feedbacks.length; j++){
            if(data.period[2] == scoreInfo[i].feedbacks[j].stage){
                scores.achievement_score = scoreInfo[i].feedbacks[j].comment_info.achievement_score;
                scores.process_score = scoreInfo[i].feedbacks[j].comment_info.process_score;
                scores.composite_score = scoreInfo[i].feedbacks[j].comment_info.composite_score;
                scores.score = scoreInfo[i].feedbacks[j].comment_info.score;
            }
        }
    }
    // console.log(scores);

    if(ctx.app)
    {
        Response.success(ctx, scores);
    }
    else
    {
        return scores;
    }
}




