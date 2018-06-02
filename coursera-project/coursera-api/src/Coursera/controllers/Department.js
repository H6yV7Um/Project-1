const Response = require('../../Response');
// 引入模型层
const Department = require('../models/Department');
const ddDepartment = require('../../User/controllers/Department');
exports.getDepartment = async (ctx,next) =>{
    // 数据库中的部门列表
    let department = await Department.find({}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    });
    Response.success(ctx,department);
}

exports.getPersonalDepartment = async (ctx,next) =>{
    let data = ctx;
    if(ctx.app) data = ctx.request.body;
    // 部门ids
    let departmentIds = data.departmentIds;
    // 同步user在钉钉上的所有部门
    let dddepartments = await ddDepartment.get({departmentIds:departmentIds})
    // 数据库中的部门列表
    let departments = await Department.find({}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    });
    // 筛选出dddepartments里面和department里面的相同部门，返回可选择的部门
    let department = []
    for(let dddepartment of dddepartments)
    {
        for(let val of departments)
        {
            if(val.department_name == dddepartment.name)
            {
                department.push(val)
            }
        }
    }
    if(ctx.app)
    {
        Response.success(ctx,department);
    }
    else
    {
        return department;
    }
}

exports.saveManagement = async (ctx,next)=>{
    let departments = JSON.parse(ctx.request.body.departments),
        company_num = ctx.request.body.company_num,
        currentDepartments = []
    for(let val of departments)
    {
        currentDepartments.push({
            department_name: val.department_name,
            user_num: val.user_num,
            company_num: company_num
        })
    }
    await Department.remove({})
    await Department.create(currentDepartments)
    Response.success(ctx,'1');
}