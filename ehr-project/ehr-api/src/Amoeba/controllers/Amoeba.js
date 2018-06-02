const Response = require('../../Response');
const XLSX = require('xlsx');
const Busboy = require('busboy');
const Amoeba = require('../models/Amoeba');
const User = require('../../User/controllers/User');
const Department = require('../../User/controllers/Department');
const Position = require('../../User/controllers/Position');
const amoebaConfig = require('../../../config/amoeba');

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

            let amoeba = null;
            const dateNow = Date.now();
            for(let i = 2; i <= parseInt(worksheet['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1]); i++)
            {
                // 新记录
                if(worksheet[`A${i}`] && worksheet[`D${i}`])
                {
                    // 存入上一记录
                    if(amoeba)
                    {
                        // console.log('\n');
                        // console.log(amoebas);
                        amoeba = await this.update(amoeba);
                        // console.log('\n');
                        // console.log(amoebas);
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
                        amoeba = {
                            // 部门ID
                            department_id : department.department_id,
                            // 部门名字
                            name : department.name,
                            // 员工ID
                            user_id : user.user_id,
                            // 属性
                            attr : {},
                            // 目标
                            objective : {},
                            // 反馈
                            feedback : {questions : []}
                        }

                        // 期望完成时间
                        let expectedTime = worksheet[`D${i}`].v.split('_');
                        if(expectedTime.length == 1) expectedTime.push(2);

                        // 年份
                        amoeba.attr.year = parseInt(expectedTime[0]);
                        switch (parseInt(expectedTime[1]))
                        {
                            // 上半年(6月30日)
                            case 1:
                                expectedTime = `${expectedTime[0]}-${amoebaConfig.firstHalfYearDate}`;
                                amoeba.attr.stage = 1;
                                break;
                            // 下半年(12月31日)
                            default:
                                expectedTime = `${parseInt(expectedTime[0])}-${amoebaConfig.secondHalfYearDate}`;
                                amoeba.attr.stage = 2;
                                break;
                        }

                        // 目标收入
                        if(worksheet[`E${i}`])
                        {
                            amoeba.objective.income = worksheet[`E${i}`].v;
                        }
                        // 目标利润
                        if(worksheet[`F${i}`])
                        {
                            amoeba.objective.profit = worksheet[`F${i}`].v;
                        }
                        // 实际收入
                        if(worksheet[`G${i}`])
                        {
                            amoeba.feedback.income = worksheet[`G${i}`].v;
                        }
                        // 实际利润
                        if(worksheet[`H${i}`])
                        {
                            amoeba.feedback.profit = worksheet[`H${i}`].v;
                        }
                        // 系数
                        if(worksheet[`I${i}`])
                        {
                            amoeba.feedback.coefficient = worksheet[`I${i}`].v;
                        }
                        // 反馈描述
                        if(worksheet[`J${i}`])
                        {
                            amoeba.feedback.describe = worksheet[`J${i}`].v;
                        }
                        // 期望反馈时间
                        amoeba.expected_time = Date.parse(new Date(expectedTime));
                        // 实际反馈时间
                        amoeba.completed_time = dateNow;
                    }
                    else
                    {
                        amoeba = null;
                    }
                }

                if(amoeba != null)
                {
                    // 反馈问题
                    if(worksheet[`K${i}`])
                    {
                        amoeba.feedback.questions.push({describe : worksheet[`K${i}`].v});
                    }
                }
            }
            // 存入末记录
            if(amoeba)
            {
                // console.log('\n');
                // console.log(amoebas);
                amoeba = await this.update(amoeba);
                // console.log('\n');
                // console.log(amoebas);
            }
            // 更新增幅

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
 * @param ctx | data: 阿米巴数据
 */
exports.add = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 新增时间
    data.create_time = Date.now();
    let amoeba = await Amoeba.create(data);
    amoeba = updateIncreases(amoeba);

    if(ctx.app)
    {
        Response.success(ctx, amoeba);
    }
    else
    {
        return amoeba;
    }
}

/**
 * 编辑
 * @param ctx | data: 阿米巴数据
 * @param _id 阿米巴主键
 */
exports.edit = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    // 编辑时间
    data.update_time = Date.now();
    let amoeba = await Amoeba.findByIdAndUpdate(data._id, data, {new : true});
    amoeba = updateIncreases(amoeba);

    if(ctx.app)
    {
        Response.success(ctx, amoeba);
    }
    else
    {
        return amoeba;
    }
}

/**
 * 更新
 * @param ctx | data: 阿米巴数据
 * @param department_id 部门ID
 * @param attr.year 年份
 * @param attr.stage 阶段
 */
exports.update = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let amoeba = await Amoeba.findOne({department_id : data.department_id, 'attr.year' : data.attr.year, 'attr.stage' : data.attr.stage, status : {$gt : 0}});
    if(amoeba)
    {
        data._id = amoeba._id;
        amoeba = this.edit(data);
    }
    else
    {
        amoeba = this.add(data);
    }

    if(ctx.app)
    {
        Response.success(ctx, amoeba);
    }
    else
    {
        return amoeba;
    }
}

/**
 * 更新增幅
 * @param ctx ctx | data: 阿米巴数据
 */
const updateIncreases = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let amoeba = null;
    let prevAmoeba = await Amoeba.findOne({department_id : data.department_id, expected_time : {$lt : data.expected_time}}).sort({expected_time : 'desc'});
    let nextAmoeba = await Amoeba.findOne({department_id : data.department_id, expected_time : {$gt : data.expected_time}}).sort({expected_time : 'asc'});
    if(prevAmoeba)
    {
        // 收入增幅
        if(data.feedback.income && prevAmoeba.feedback.income)
        {
            data.feedback.income_increases = ((data.feedback.income - prevAmoeba.feedback.income) / Math.abs(prevAmoeba.feedback.income)).toFixed(2);
        }
        else
        {
            data.feedback.income_increases = null;
        }
        // 利润增幅
        if(data.feedback.profit && prevAmoeba.feedback.profit)
        {
            data.feedback.profit_increases = ((data.feedback.profit - prevAmoeba.feedback.profit) / Math.abs(prevAmoeba.feedback.profit)).toFixed(2);
        }
        else
        {
            data.feedback.profit_increases = null;
        }
        amoeba = await Amoeba.findByIdAndUpdate(data._id, data, {new : true});
    }
    else
    {
        amoeba = data;
    }

    if(nextAmoeba)
    {
        // 下一阿米巴收入增幅
        if(data.feedback.income && nextAmoeba.feedback.income)
        {
            nextAmoeba.feedback.income_increases = ((nextAmoeba.feedback.income - data.feedback.income) / Math.abs(data.feedback.income)).toFixed(2);
        }
        else
        {
            nextAmoeba.feedback.income_increases = null;
        }
        // 下一阿米巴利润增幅
        if(data.feedback.profit && nextAmoeba.feedback.profit)
        {
            nextAmoeba.feedback.profit_increases = ((nextAmoeba.feedback.profit - data.feedback.profit) / Math.abs(data.feedback.profit)).toFixed(2);
        }
        else
        {
            nextAmoeba.feedback.profit_increases = null;
        }
        await Amoeba.findByIdAndUpdate(nextAmoeba._id, nextAmoeba);
    }

    if(ctx.app)
    {
        Response.success(ctx, amoeba);
    }
    else
    {
        return amoeba;
    }
}

/**
 * 获取阿米巴
 * @param ctx | data
 * @param id  主键
 * @param userId  发布人ID
 * @param userIds  发布人ID数组
 * @param departmentId  部门ID
 * @param departmentIds  部门ID数组
 * @param date  起止日期(闭区间) 如[2016, 2017]
 * @param sort  排序规则
 * @param page  页数
 * @param limit  获取条数
 * @return 不分页:[{AMOEBA}]  分页:{isGetAll:是否获取完, amoeba:[{AMOEBA}]}
 */
exports.get = async ctx => {
    let data = ctx;
    if(ctx.app) data = ctx.request.body;

    let amoebas = [];
    let condition = {status : {$gt : 0}};
    // 条件:主键
    if(data.id)
    {
        condition._id = data.id;
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
        amoebas = await Amoeba.find(condition).sort(sort).skip(limit * (data.page - 1)).limit(limit + 1);
        // 未取尽
        if(amoebas.length == limit + 1)
        {
            isGetAll = false;
            amoebas.splice(limit, 1);
        }
        else
        {
            isGetAll = true;
        }
    }
    else
    {
        amoebas = await Amoeba.find(condition).sort(sort);
    }

    // 验权(wait)

    // 单条返回
    if(data.id && amoebas.length == 1)
    {
        amoebas = amoebas[0];
    }
    else
    {
        // 分页是否取尽
        if(isGetAll === true || isGetAll === false)
        {
            amoebas = {amoebas, isGetAll};
        }
    }

    if(ctx.app)
    {
        Response.success(ctx, amoebas);
    }
    else
    {
        return amoebas;
    }
}