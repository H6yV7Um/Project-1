const mongoose = require('mongoose');

const CrawlingCvSchema = new mongoose.Schema({
    //日期
    date:{
      type:String
    },
    // 简历ID
    id: {
        type: String,
        // unique: true,
        require: true
    },
    // 根据id查询简历的url
    url: {
        type: String,
        // require: true
    },
    // 基本信息
    personal_info: {
        name:String,
        sex:String,
        age:String,
        cellphone:String,
        mail:String,
        education:String,
        //工作经验
        working:String,
        //婚姻
        marital:String,
        //状态
        occupation:String,
        //所在地
        location:String,
        //国籍
        nationality:String,
        //行业
        industry:String,
        //当前公司
        company:String,
        //职位
        position:String,
        //工资
        salary:String,
        //期望行业
        expected_industry:String,
        //期望职位
        expected_position:String,
        //期望地点
        expected_location:String,
        //期望薪资
        expected_salary:String,
        //语言
        language:String,
        //自我评价
        self_evaluation:String
    },
    // 工作经历
    work_experience: [{
        work_times:String,
        work_company:String,
        work_post:String,
        work_location:String,
        //下属人数
        work_subordinates:String,
        work_responsibilities:String
    }],
    // 项目经历
    pro_experience: [{
        //项目时间
        pro_times:String,
        //项目职务
        pro_position:String,
        //所在公司 组织
        pro_organization:String,
        //项目职责
        pro_responsibility:String,
        //项目业绩
        pro_performance:String,
        //项目简介
        project_brief:String,
        //项目名称
        pro_name:String,
    }],
    // 教育经历
    education:[{
        date:String,
        university:String,
        major:String,
        education_background:String
    }]
});

module.exports = mongoose.model('crawling_cv', CrawlingCvSchema);
