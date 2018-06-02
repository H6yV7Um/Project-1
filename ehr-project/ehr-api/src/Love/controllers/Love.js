const Response = require('../../Response');
const XLSX = require('xlsx');
const Busboy = require('busboy');
const Love = require('../models/Love');
const User = require('../../User/controllers/User');
const Department = require('../../User/controllers/Department');
const Position = require('../../User/controllers/Position');
const loveConfig = require('../../../config/love');

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

            let love = null;
            const dateNow = Date.now();
            for(let i = 2; i <= parseInt(worksheet['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1]); i++)
            {
                // 新记录
                if(worksheet[`A${i}`] && worksheet[`D${i}`])
                {
                    // 存入上一记录
                    if(love)
                    {
                        // console.log('\n');
                        // console.log(love);
                        love = await this.update(love);
                        // console.log('\n');
                        // console.log(love);
                    }

                    // 获取部门
                    let department = null;
                    if(worksheet[`B${i}`])
                    {
                        department = await Department.get({departmentId : worksheet[`B${i}`].v});
                    }
                    else
                    {
                        department = await Department.get({name : worksheet[`A${i}`].v});
                        if(department.length > 0)
                        {
                            department = department[0];
                        }
                    }
                    // 获取发布人
                    const user = await User.getByName(worksheet[`C${i}`].v);
                    if(department && user)
                    {
                        love = {
                            // 部门ID
                            department_id : department.department_id,
                            // 部门名字
                            name : department.name,
                            // 员工ID
                            user_id : user.user_id,
                            // 属性
                            attr : {type : 20},
                            // love
                            loves : [],
                            // 反馈
                            feedbacks : []
                        }

                        // 期望完成时间
                        let expectedTime = worksheet[`D${i}`].v.split('_');
                        if(expectedTime.length == 1) expectedTime.push(2);

                        // 年份
                        love.attr.year = parseInt(expectedTime[0]);
                        switch (parseInt(expectedTime[1]))
                        {
                            // 上半年(6月30日)
                            case 1:
                                expectedTime = `${expectedTime[0]}-${loveConfig.firstHalfYearDate}`;
                                love.attr.stage = 1;
                                break;
                            // 下半年(12月31日)
                            default:
                                expectedTime = `${parseInt(expectedTime[0])}-${loveConfig.secondHalfYearDate}`;
                                love.attr.stage = 2;
                                break;
                        }
                        love.expected_time = Date.parse(new Date(expectedTime));

                        // 状态
                        love.status = worksheet[`R${i}`] && worksheet[`R${i}`].v == '是' ? 200 : 100;

                        // 实际完成时间
                        if(love.status == 200)
                        {
                            love.completed_time = dateNow;
                        }
                    }
                    else
                    {
                        love = null;
                    }
                }

                if(love != null)
                {
                    // 目标
                    if(worksheet[`E${i}`])
                    {
                        love.loves.push({objective : worksheet[`E${i}`].v});
                    }

                    // 反馈
                    if(worksheet[`F${i}`])
                    {
                        love.feedbacks.push(
                            {
                                questions : [],
                                achievements : [],
                                surveys : [],
                                work : {files : []},
                                comment_info : {comments : []},
                                expected_time : Date.parse(new Date(`${love.attr.year}-${love.attr.stage == 1 ? loveConfig.firstHalfYearFeedback : loveConfig.secondHalfYearFeedback}`))
                            }
                        );

                        // 系数
                        if(worksheet[`Q${i}`])
                        {
                            love.feedbacks[love.feedbacks.length-1].comment_info.coefficient = worksheet[`Q${i}`].v;
                        }

                        // 反馈描述
                        if(worksheet[`F${i}`])
                        {
                            love.feedbacks[love.feedbacks.length-1].describe = worksheet[`F${i}`].v;
                            // 实际反馈时间
                            love.feedbacks[love.feedbacks.length-1].completed_time = dateNow;
                        }

                        // 组织述职
                        if(worksheet[`L${i}`])
                        {
                            love.feedbacks[love.feedbacks.length-1].work.describe = worksheet[`L${i}`].v;
                            // 述职附件
                            if(worksheet[`M${i}`])
                            {
                                love.feedbacks[love.feedbacks.length-1].work.files.push(worksheet[`M${i}`].v);
                            }
                        }
                    }

                    // 反馈问题
                    if(worksheet[`G${i}`])
                    {
                        love.feedbacks[love.feedbacks.length-1].questions.push({describe : worksheet[`G${i}`].v});
                    }

                    // 反馈成果
                    if(worksheet[`H${i}`])
                    {
                        love.feedbacks[love.feedbacks.length-1].achievements.push({describe : worksheet[`H${i}`].v});
                    }

                    // 调研人
                    if(worksheet[`I${i}`])
                    {
                        const researcher = await User.getByName(worksheet[`I${i}`].v);
                        if(researcher)
                        {
                            let survey = {user_id : researcher.user_id, files : [], create_time : dateNow, update_time : dateNow};
                            // 调研情况
                            if(worksheet[`J${i}`])
                            {
                                survey.describe = worksheet[`J${i}`].v;
                            }
                            // 调研附件
                            if(worksheet[`K${i}`])
                            {
                                survey.files.push(worksheet[`K${i}`].v);
                            }

                            love.feedbacks[love.feedbacks.length-1].surveys.push(survey);
                        }
                    }

                    // 评价人
                    if(worksheet[`N${i}`])
                    {
                        const reviewer = await User.getByName(worksheet[`N${i}`].v);
                        if(reviewer)
                        {
                            let comment = {user_id : reviewer.user_id, create_time : dateNow, update_time : dateNow};
                            // 评论
                            if(worksheet[`O${i}`])
                            {
                                comment.comment = worksheet[`O${i}`].v;
                            }
                            // 评分
                            if(worksheet[`P${i}`])
                            {
                                comment.score = worksheet[`P${i}`].v;
                            }

                            love.feedbacks[love.feedbacks.length-1].comment_info.comments.push(comment);
                            let score = -1;
                            let scoreNum = 0;
                            for(let j = 0; j < love.feedbacks[love.feedbacks.length-1].comment_info.comments.length; j++)
                            {
                                if(love.feedbacks[love.feedbacks.length-1].comment_info.comments[j]['score'])
                                {
                                    score = score == -1 ? love.feedbacks[love.feedbacks.length-1].comment_info.comments[j]['score'] : score + love.feedbacks[love.feedbacks.length-1].comment_info.comments[j]['score'];
                                    scoreNum++;
                                }
                            }
                            if(scoreNum != 0)
                            {
                                love.feedbacks[love.feedbacks.length-1].comment_info.score = Math.floor(score / scoreNum * 10) / 10;
                                love.feedbacks[love.feedbacks.length-1].comment_info.update_time = dateNow;
                            }
                        }
                    }
                }
            }
            // 存入末记录
            if(love)
            {
                // console.log('\n');
                // console.log(love);
                love = await this.update(love);
                // console.log('\n');
                // console.log(love);
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
 * @param ctx | data: LOVE数据
 */
exports.add = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 新增时间
    data.create_time = Date.now();
    const love = await Love.create(data);

    if(ctx.app)
    {
        Response.success(ctx, love);
    }
    else
    {
        return love;
    }
}

/**
 * 编辑
 * @param ctx | data: LOVE数据
 * @param _id LOVE主键
 */
exports.edit = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 编辑时间
    data.update_time = Date.now();
    const love = await Love.findByIdAndUpdate(data._id, data, {new : true});

    if(ctx.app)
    {
        Response.success(ctx, love);
    }
    else
    {
        return love;
    }
}

/**
 * 更新
 * @param ctx | data: LOVE数据
 * @param department_id 部门ID
 * @param attr.type 分类
 * @param attr.year 年份
 * @param attr.stage 阶段
 */
exports.update = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let love = await Love.findOne({department_id : data.department_id, 'attr.type' : data.attr.type, 'attr.year' : data.attr.year, 'attr.stage' : data.attr.stage, status : {$gt : 0}});
    if(love)
    {
        data._id = love._id;
        love = this.edit(data);
    }
    else
    {
        love = this.add(data);
    }

    if(ctx.app)
    {
        Response.success(ctx, love);
    }
    else
    {
        return love;
    }
}

/**
 * 获取LOVE
 * @param ctx | data
 * @param id  主键
 * @param feedbackId  反馈ID
 * @param userId  发布人ID
 * @param userIds  发布人ID数组
 * @param departmentId  部门ID
 * @param departmentIds  部门ID数组
 * @param date  起止日期(闭区间) 如[2016, 2017]
 * @param sort  排序规则
 * @param page  页数
 * @param limit  获取条数
 * @param isGetFeedbackDetail  是否获取反馈详情(默认:false)
 * @return 不分页:[{LOVE}]  分页:{isGetAll:是否获取完, loves:[{LOVE}]}
 */
exports.get = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let loves = [];
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
    // 条件:单个部门ID
    if(data.departmentId)
    {
        if(Object.prototype.toString.call(data.departmentId) == '[object Array]')
        {
            condition.department_id = {$in : data.departmentId};
        }
        else
        {
            condition.department_id = data.departmentId;
        }
    }
    // 条件:多个部门ID
    if(data.departmentIds)
    {
        condition.department_id = {$in : data.departmentIds};
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
    const sort = data.sort || {expected_time : 'desc', department_id : 'desc'};

    // 获取
    let isGetAll = null;
    if(data.page)
    {
        // 分页
        const limit = parseInt(data.limit) || 10;
        loves = await Love.find(condition).sort(sort).skip(limit * (data.page - 1)).limit(limit + 1);
        // 未取尽
        if(loves.length == limit + 1)
        {
            isGetAll = false;
            loves.splice(limit, 1);
        }
        else
        {
            isGetAll = true;
        }
    }
    else
    {
        loves = await Love.find(condition).sort(sort);
    }

    // 验权(wait)

    for(let k=0; k<loves.length; k++)
    {
        // 获取反馈详情
        if(data.isGetFeedbackDetail)
        {
            for(let i=0; i<loves[k].feedbacks.length; i++)
            {
                if(!data.feedbackId || loves[k].feedbacks[i]._id == data.feedbackId)
                {
                    // 调研情况
                    for(let j=0; j<loves[k].feedbacks[i].surveys.length; j++)
                    {
                        const researcher = await User.getById(loves[k].feedbacks[i].surveys[j].user_id);
                        loves[k].feedbacks[i].surveys[j]._doc.name = researcher.name;
                        loves[k].feedbacks[i].surveys[j]._doc.avatar = researcher.avatar;
                    }
                    // 评价信息
                    for(let j=0; j<loves[k].feedbacks[i].comment_info.comments.length; j++)
                    {
                        const commenter = await User.getById(loves[k].feedbacks[i].comment_info.comments[j].user_id);
                        loves[k].feedbacks[i].comment_info.comments[j]._doc.name = commenter.name;
                        loves[k].feedbacks[i].comment_info.comments[j]._doc.avatar = commenter.avatar;
                    }
                }
            }
        }
    }

    // 单条返回
    if((data.id || data.feedbackId) && loves.length == 1)
    {
        loves = loves[0];
    }
    else
    {
        // 分页是否取尽
        if(isGetAll === true || isGetAll === false)
        {
            loves = {loves, isGetAll};
        }
    }

    if(ctx.app)
    {
        Response.success(ctx, loves);
    }
    else
    {
        return loves;
    }
}