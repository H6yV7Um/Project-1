const Response = require('../../Response');
const Coursera = require('../models/Coursera');
const User = require('../../User/controllers/User');
const Department = require('./Department');
const XLSX = require('xlsx');
const Busboy = require('busboy');
const Request = require('../../../utils/Request');
const puppeteer = require('puppeteer')
const devices = require('../../../utils/DeviceDescriptors');
const Oss = require('../../../utils/Oss');
const KillChromium = require('../../../utils/KillChromium');
const ddDepartment = require('../../User/controllers/Department');
const Executives = require('../../../config/executives.js');
const path = require('path')
const fs = require('fs');  
const xlsx = require('node-xlsx');
const zip = new require('node-zip')();

const hmacsha1 = require('hmacsha1');
const queryString = require('query-string');
// const https = require('https');
const  urlencode  = require('urlencode');
let browser = null;
let page = null;
exports.getCourseraList = async (ctx,next) => {
    let page = ctx.request.body.page,PAGE_COUNT = 50,is_end = true,res = {}
    let data = await Coursera.find({}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    .sort({date: -1})
    .skip(PAGE_COUNT * (page - 1)) 
    .limit(PAGE_COUNT)
    .exec()
    let count = await Coursera.count({})//统计一共有多少条数据
    if(data.length == PAGE_COUNT)
    {
        is_end = false
    }
    res.data = data
    res.page = parseInt(page)+1
    res.is_end = is_end
    res.count = count
    Response.success(ctx,res)
}
//筛选查询
exports.filter = async (ctx,next) => {
    let page = ctx.request.body.filterPage,
        FILTER_PAGE_COUNT = 50,
        filter_is_end = true,
        res={},
        findCondition = {},
        sort = -1,
        condition =  ctx.request.body.condition
    if(condition.departmentOrder)
    {
        findCondition['department.department_name'] = {"$in": condition.departmentOrder}
    }
    if(condition.schoolOrder)
    {
        findCondition.school = {"$in": condition.schoolOrder}
    }
    if(condition.dateOrder)
    {
        if(condition.dateOrder == "desc" || condition.dateOrder[0] == "desc")
        {
            sort = -1
        }
        else if(condition.dateOrder == "asc" || condition.dateOrder[0] == "asc")
        {
            sort = 1
        }
    }
    let filter_count = await Coursera.find(findCondition).count()
    let data = await Coursera.find(findCondition, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    .sort({date: sort})
    .skip(FILTER_PAGE_COUNT * (page - 1)) 
    .limit(FILTER_PAGE_COUNT) 
    .exec()
    if(data.length == FILTER_PAGE_COUNT)
    {
        filter_is_end = false
    }
    res.data = data
    res.page = parseInt(page)+1
    res.filter_is_end = filter_is_end
    res.filter_count = filter_count
    Response.success(ctx,res)
}
exports.getAllCourseraList = async (ctx,next) =>{
    let res = {}
    let data = await Coursera.find({}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    let count = await User.getCount()//统计一共有多少条数据
    res.data = data
    res.count = count
    Response.success(ctx,res);
}
exports.searchList = async (ctx,next) =>{
    let val = ctx.request.body.val,
        page = ctx.request.body.page,
        SEARCH_PAGE_COUNT = 50,
        search_is_end = true,
        res={},
        data = null,
        condition={}
    if(val == '')
    {
        condition={}
    }
    else{
        val = new RegExp(val, 'i') //不区分大小写
        condition={"$or":[{'user.name':{$regex:val}},{'department.department_name':{$regex:val}},{school:{$regex:val} },{courseraname:{$regex:val}}]}
    }
    let search_count = await Coursera.find(condition).count()
    data = await Coursera.find(condition, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length == 0 ? null : docs
            }
        })
        .sort({date: -1})
        .skip(SEARCH_PAGE_COUNT * (page - 1)) 
        .limit(SEARCH_PAGE_COUNT) 
        .exec()
    if(data.length == SEARCH_PAGE_COUNT)
    {
        search_is_end = false
    }
    res.data = data
    res.page = parseInt(page)+1
    res.search_is_end = search_is_end
    res.search_count = search_count
    Response.success(ctx,res);
}
exports.getSchool = async (ctx,next) =>{
    let cursor = await Coursera.find({}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    let result = cursor.map(function(doc) {
        return {school: doc.school};
    });
    Response.success(ctx,result);
}
exports.getFile = async (ctx, next) => {
    const busboy = new Busboy({headers : ctx.req.headers});
    busboy.on('file',async (fieldname, file, filename, encoding, mimetype) => {
        let fileDate = null;
        file.on('data', data => {
            fileDate = fileDate == null ? data : Buffer.concat([fileDate, data]);
        })
        file.on('end', async () => {
            const workbook = XLSX.read(fileDate);
            // 表格列表
            const sheetNames = workbook.SheetNames;
            const worksheet = workbook.Sheets[sheetNames[0]];
            let count = 0
            for(let i = 2; i <= parseInt(worksheet['!ref'].replace(/[a-zA-Z]/g, '').split(':')[1]); i++)
            {
                if(worksheet[`A${i}`].v)
                {
                    count++
                    const trim = (str)=>
                    {
                        return str.replace(/(^\s*)|(\s*$)/g, "");
                    }
                    let user = await User.getByName(trim(worksheet[`A${i}`].v)),
                        stringTime = worksheet[`B${i}`].w,
                        timestamp = Date.parse(new Date(stringTime))/1000,
                        str = worksheet[`E${i}`].f ? worksheet[`E${i}`].f.slice(10).split(',')[0] : '',
                        ecCertificate = str.substring(1,str.length-1)
                    let records = `https://coursera.org/account/accomplishments/records/`,
                        certificate = `https://coursera.org/account/accomplishments/certificate/`,
                        verity = `https://coursera.org/account/accomplishments/verify/`,
                        recordsKeys = ecCertificate.split(records),
                        certificateKeys = ecCertificate.split(certificate),
                        verityKeys = ecCertificate.split(verity)
                    // 判断当前页面是否是coursera record页面这个是要显示的页面
                    let key = ''
                    if(recordsKeys.length == 2)
                    {
                        key = recordsKeys[1]
                    }
                    // 判断当前页面是否是coursera证书pdf页面
                    else if(certificateKeys.length == 2)
                    {
                        key = certificateKeys[1]
                    }
                    // 判断当前页面是否是verify页面
                    else if(verityKeys.length == 2)
                    {
                        key = verityKeys[1]
                    }
                    let url = 'https://coursera.org/api/memberships.v1?' +
                        'fields=courseId,enrolledTimestamp,grade,lastAccessedTimestamp,role,signatureTrackProfile,v1SessionId,vcMembershipId,' +
                        'vcMemberships.v1(certificateCode,certificateCodeWithGrade,grade,grantedAt),' +
                        'courses.v1(categories,certificatePartnerLogo,certificates,description,durationString,instructorIds,name,partnerIds,' +
                        'partnerLogo,photoUrl,startDate,v1Details,workload),' +
                        'partners.v1(classLogo,homeLink,logo,name,shortName),' +
                        'instructors.v1(firstName,fullName,lastName,middleName,prefixName,profileId,shortName,suffixName),' +
                        'v1Details.v1(aboutTheCourse,courseSyllabus,name,sessionIds,shortName),' +
                        'v1Sessions.v1(active,certificatesReleased,courseId,dbEndDate,durationString,eligibleForCertificate,' +
                        'gradingPolicyDistinction,gradingPolicyNormal,hasSigTrack,homeLink,instructorIds,startDay,startMonth,startYear,status,v1VcDetailId),' +
                        'signatureTrackProfiles.v1(firstName,lastName,middleName)' +
                        '&includes=courseId,signatureTrackProfile,vcMembershipId,' +
                        'courses.v1(categories,instructorIds,partnerIds,v1Details),' +
                        `v1Details.v1(sessionIds)&q=byCode&code=${key}&showHidden=true`
                    let courseraJson = await Request.get(url)
                    if(courseraJson.errorCode)
                    {
                        continue
                    }
                    // 构造coursera证书信息存入数据库
                    let coursera_info = {
                        // 获取证书时间
                        date: courseraJson.linked['vcMemberships.v1'][0].grantedAt/1000,
                        school: courseraJson.linked['partners.v1'][0].name,
                        courseraname: courseraJson.linked['courses.v1'][0].name,
                        certificate: verity + key,
                        user:  user,
                        coursera_key: key
                    }

                    // 判断证书是否已经存在
                    let isCourseraExist = await Coursera.find({'coursera_id': courseraJson.elements[0].id})
                    if(!isCourseraExist.length)
                    {
                        // let certificatePath = await screeshot( coursera_info.certificate,coursera_info.coursera_key)
                        if(user)
                        {
                            let department = await Department.getPersonalDepartment({departmentIds:user.department_ids})
                            let executives = Executives
                            if(executives.indexOf(user.name) != -1)
                            {
                                coursera_info.department = [{'department_name':'高管'}]
                            }
                            else
                            {
                                coursera_info.department = department
                            }
                            coursera_info.user_id = user.user_id
                            coursera_info.coursera_id = courseraJson.elements[0].id
                            // coursera_info.certificate_path = certificate_path
                            coursera_info.certificate_path = `/screenshots/${coursera_info.coursera_key}.jpeg`
                            await Coursera.create(coursera_info)
                        }
                        else
                        {
                            let user_id = Date.parse(new Date())+Math.floor(Math.random()*10000+1)
                            coursera_info.user_id = `leave_${user_id}`
                            coursera_info.department = []
                            coursera_info.user = {name: trim(worksheet[`A${i}`].v)}
                            coursera_info.coursera_id = courseraJson.elements[0].id
                            // coursera_info.certificate_path = certificatePath
                            coursera_info.certificate_path = `/screenshots/${coursera_info.coursera_key}.jpeg`
                            // await User.updateUserInfo({user_id: `leave_${user_id}`,name: trim(worksheet[`A${i}`].v)})
                            await Coursera.create(coursera_info)
                        }
                    }

                }
            }
        });
    })
    busboy.on('error', err => {
        console.log(err);
    })
    Response.success(ctx, {});
    return ctx.req.pipe(busboy);
}
exports.getAllLatestCourseraList = async (ctx,next) =>{
    let page = ctx.request.body.page,
        PAGE_COUNT = 50,
        res={},
        count =  await Coursera.find({create_date:{$exists:true}}).count()
    let data = await Coursera.find({create_date:{$exists:true}}, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    .sort({create_date: -1})
    .skip(PAGE_COUNT * (page - 1)) 
    .limit(PAGE_COUNT) 
    .exec()
    res.data = data
    res.count = count
    Response.success(ctx,res);
}
exports.resetDbCoursera = async (ctx,next) => {
    let data = await Coursera.find({}),
        newData = []
    for(let val of data)
    {
        let user = await User.getById(val.user_id),
            executives = Executives,
            department = []
        if(executives.indexOf(user.name) != -1)
        {
            department = [{'department_name':'高管'}]
        }
        else
        {
            department = await Department.getPersonalDepartment({departmentIds:user.department_ids})
        }
        // 构造coursera证书信息存入数据库
        newData.push({
            // 员工ID
            user_id: val.user_id,
            // 获取证书时间
            date: val.date,
            school: val.school,
            courseraname: val.courseraname,
            certificate: val.certificate,
            department: department,
            user: user,
            coursera_id: val.coursera_id,
            coursera_key: val.coursera_key,
            certificate_path: val.certificate_path
        })
    }
    await Coursera.remove({})
    await Coursera.create(newData)
    Response.success(ctx,'1');
}
// 根据名字或者部门获取coursera列表
exports.searchPersonalList = async (ctx,next) => {
    let val = ctx.request.body.val,
        page = ctx.request.body.searchPage,
        SEARCH_PAGE_COUNT = 50,
        search_is_end = true,
        res={},
        condition={'$or':[{'user.name':val},{'department.department_name': val}]}
    let search_count = await Coursera.find(condition).count()
    data = await Coursera.find(condition, (err, docs) => {
        if(err) {
            console.log(err);
        }else {
            return docs.length == 0 ? null : docs
        }
    })
    .sort({date: -1})
    .skip(SEARCH_PAGE_COUNT * (page - 1))
    .limit(SEARCH_PAGE_COUNT)
    .exec()
    if(data.length == SEARCH_PAGE_COUNT)
    {
        search_is_end = false
    }
    res.data = data
    res.page = parseInt(page)+1
    res.search_is_end = search_is_end
    res.search_count = search_count
    Response.success(ctx,res);
}
// 根据部门名字查询所有获取证书的人
exports.searchCourseraByDepartment = async (ctx,next)=>
{
    let department = ctx.request.body.val, res = {}
    //高管单独算
    if(department == '高管')
    {
        let executives = Executives
        let data = await Coursera.find({'user.name': {'$in': executives}}, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length == 0 ? null : docs
            }
        })
        res.data = data;
        let user = []
        for(let val of executives)
        {
            user.push({
                name: val
            })
        }
        res.user = user;
    }
    else
    {
        // 根据部门名称获取部门id
        let currentdepartment = await ddDepartment.get({name: department});
        // 根据部门id获取部门里面的所有人
        let users = await User.getUserByDepartmentID(currentdepartment[0].department_id);
        // 查询出coursera里面该部门里已经有证书的人
        let data = await Coursera.find({'user.department_ids':{"$all":[currentdepartment[0].department_id]},"department":{$elemMatch:{"department_name":{'$ne':'高管'}}} }, (err, docs) => {
            if(err) {
                console.log(err);
            }else {
                return docs.length == 0 ? null : docs
            }
        })
        res.data = data;
        res.user = users;
    }
    Response.success(ctx,res);
}
// 跨域获取Cousera证书信息匹配成功将证书信息存入数据库中
exports.crossDomain =  async (ctx,next) =>
{
    //cousera证书链接
    let body = ctx.request.body,url = body.url,
        courseraJson = await Request.get(url),
        verity = `https://coursera.org/account/accomplishments/verify/` ,
        userInfo = body.userInfo
    // 请求错误
    if(courseraJson.errorCode)
    {
        Response.success(ctx,{isCoursrea: false})
        return
    }
    // 判断证书是否已经存在
    let  data = await Coursera.find({'coursera_id': courseraJson.elements[0].id})
    if(data.length)
    {
        Response.success(ctx,{isEixst: true})
    }
    else
    {
        let newData =  {
            // certificat vertify页面的key，两个页面的key相同
            certificateCode: courseraJson.linked['vcMemberships.v1'][0].certificateCode,
            // 获得证书的时间
            grantedAt: courseraJson.linked['vcMemberships.v1'][0].grantedAt,
            // 课程名称w
            courseraname: courseraJson.linked['courses.v1'][0].name,
            // 学校名称
            school: courseraJson.linked['partners.v1'][0].name,
        }
        let user = await User.getById(userInfo.user_id),
            courseraInfo = {},
            executives = Executives,
            department = []
        if(executives.indexOf(user.name) != -1)
        {
            department = [{'department_name':'高管'}]
        }
        else
        {
            department = await Department.getPersonalDepartment({departmentIds:user.department_ids})
        }
        // 构造coursera证书信息存入数据库
        courseraInfo = {
            // 员工ID
            user_id: userInfo.user_id,
            // 获取证书时间
            date: newData.grantedAt/1000,
            // 提交时间
            create_date: Date.parse(new Date())/1000,
            school: newData.school,
            courseraname: newData.courseraname,
            certificate: verity + newData.certificateCode,
            coursera_id: courseraJson.elements[0].id,
            coursera_key: newData.certificateCode,
            department: department,
            user:  user,
        }
        // let certificatePath =  await screeshot(courseraInfo.coursera_key)
        courseraInfo.certificate_path = ''
        let newCoursera = new Coursera(courseraInfo),isError = false;
        //保存coursera信息
        let res = await newCoursera.save((err, docs) => {
            if(err) {
                isError = true;
            }else {
                return docs;
            }
        })
        if(isError) {
            Response.success(ctx, {isCoursrea: isError});
        }else {
            Response.success(ctx, {res: res,isCoursrea: true});
            asyloadimg(courseraInfo)
        }
    }
}

let asyloadimg = async(courseraInfo)=> {
    let certificatePath = await screeshot( courseraInfo.certificate,courseraInfo.coursera_key,1);
    await Coursera.findOne({ certificate: courseraInfo.certificate }, function (err, doc){
        doc.certificate_path = certificatePath
        doc.save();
    });
    // /var/www/coursera-api/static/screenshots
    let shotsPath = process.env.NODE_ENV == 'development' ? '/Users/ant/Desktop/coursera-api/static/screenshots/' : '/var/www/coursera-api/static/screenshots'
    await Oss.shell_oss('./OSS_Python_API_20160419',shotsPath , 'oss://new-tap4fun/cousera');
    // Coursera.update({certificate:courseraInfo.certificate},{certificate_path:certificatePath})
    // 杀死chromium进程
    // LW：使用同一个 browser, page；
   // KillChromium.kill()
}
// 审核删除方法
exports.delete =  async (ctx,next) =>
{
    let _id = ctx.request.body._id
    let isdelete = await Coursera.remove({_id: _id}, function(error){
        if(error) {
            return false
        } else {
            return true
        }
    });
    Response.success(ctx, isdelete);
}
// 截取coursera证书的页面
const screeshot = async(url, key,deeper)=> {
    if (!browser) {
        browser = await puppeteer.launch({
            headless : true,
            timeout : 0,
            args : ['--no-sandbox', '--disable-setuid-sandbox']
        });
        page = await browser.newPage()
    }
    // console.log(browser)
    let device = {
        'name': 'iPhone 6 Plus',
        'userAgent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
        'viewport': {
            'width': 414,

            'deviceScaleFactor': 3,
            'isMobile': true,
            'hasTouch': true,
            'isLandscape': false
        }}
    device.viewport.height  =  540
    await page.emulate(device);
    // 等待网络状态为空闲的时候才继续执行
    try {
        // console.log('1',url)
        // console.log(page)
        await page.goto(url,{timeout: 0,waitUntil: ['networkidle0']})
        // console.log('1.2')
        await page.waitForSelector(".rc-PageFooter")
        // console.log('1.3')
        await page.waitFor(10*1000)
        // console.log('2')

        await page.evaluate(() => {
            let height = document.querySelector('.c-accomplishments-table-body').clientHeight;
            if(height > 620) {
                document.title = 'long'
            }
            else{
                document.title = 'short'
            }
            document.querySelector('.c-accomplishments-header').style.display = 'none';
            document.querySelector('.rc-PageFooter').style.display = 'none';
            document.querySelector('.c-accomplishments-table-body').style.paddingTop = 0;
            document.querySelector('.c-accomplishments-table-body').style.paddingBottom = 0;
            document.querySelector('.bt3-col-sm-7>h4').style.marginTop = '15px';
            document.querySelector('.bt3-row').style.display = 'none'
            document.querySelectorAll('.bt3-col-sm-7 p')[4].style.display = 'none';
            document.querySelector('.bt3-col-sm-7 div').style.display = 'none';
            document.querySelector('.c-phoenix-template-body-container').style.marginTop = 0
            let tableHeaders = document.querySelectorAll('.c-accomplishments-table-header')
            for (let val of tableHeaders) {
                val.style.display = 'none'
            }
            let elements = document.querySelectorAll('.c-accomplishments-table-subheader');
            elements[0].style.display = 'none';
            elements[0].nextSibling.style.display = 'none';
            elements[1].style.display = 'none';
            elements[1].nextSibling.style.display = 'none';
            elements[1].nextSibling.nextSibling.style.display = 'none'
        });
        // console.log('3',key)
        let title = await page.title()
        if(title == 'long'){
            device.viewport.height = 596;
            await page.emulate(device);
        }
        else{
            device.viewport.height = 540;
            await page.emulate(device);
        }
        // rc-PageFooter
        let a = await page.screenshot({
            path : path.join(__dirname, '..', '..', '..', 'static', 'screenshots', key + '.jpeg'),
            type : 'jpeg',
            quality : 100,
            // fullPage: true
        })
        // console.log('4',a)
        let staticPath = `/screenshots/${key}.jpeg`
        // browser.close()
        return staticPath
    } catch (e) {
        if (deeper<100){
            // console.log('5' ,e)
            return screeshot(url,key,deeper+1)
        } else {
            return ''
        }
    }
}


// exports.downloadCourseraExcel = async (ctx,next)=>{
//     let xlsxpath1 = path.join(__dirname, '..', '..', '..', 'static', 'courseraExcel', 'excel1.xlsx' )
//     let xlsxpath2 = path.join(__dirname, '..', '..', '..', 'static', 'courseraExcel', 'excel2.xlsx' )
//     let outputpath = path.join(__dirname, '..', '..', '..', 'static', 'output.zip')
//     // 生成文件
//     await selectData(selectDataCb)
//     // 生成压缩文件
//     let zipfile = path.join(__dirname, '..', '..', '..', 'static', 'output.zip')
//     zip.file('excel1.xlsx', fs.readFileSync(xlsxpath1));
//     zip.file('excel2.xlsx', fs.readFileSync(xlsxpath2));
//     let data = zip.generate({ base64:false, compression: 'DEFLATE' });
//     fs.writeFileSync(outputpath, data, 'binary');
//     ctx.type = '.zip';
//     // 请求返回，生成的xlsx文件
//     ctx.body = fs.readFileSync(zipfile);
//     // 请求返回后，删除生成的xlsx文件，删除生成的压缩文件
//     fs.unlink(xlsxpath1);
//     fs.unlink(xlsxpath2);
//     fs.unlink(outputpath);
// // }
// const selectData = async (callback) => {
//     let data1 = await Coursera.find({}, (err, docs) => {
//         if(err) {
//             console.log(err);
//         }else {
//             return docs.length == 0 ? null : docs
//         }
//     })
//     let data2 = await Coursera.aggregate([{$group : {_id: "$user.name", num_tutorial : {$sum : 1}}}])
//     await callback(data1,data2)
// }
// // 读取并写入excel文件
// const selectDataCb = async (result1,result2)=>{
//     let company = await getCompanyUserDepartment();
//     // console.log(company)
//     // JSON数组，第一行是Excel表头
//     // 生成普通列表
//     let data_content1 = [
//         ['学员', '获取证书时间', '部门', '学校', '课程证书', '课程链接']
//     ];
//     for (let i = 0; i < result1.length; i++) {
//         // 转换时间戳
//         let newDate = new Date();
//         newDate.setTime(result1[i].date * 1000);
//         let arry = [
//             result1[i].user.name,
//             `${newDate.getFullYear()}-${newDate.getMonth()+1}-${newDate.getDate()}`,
//             // result[i].department,
//             '',
//             result1[i].school,
//             result1[i].courseraname,
//             result1[i].certificate,
//         ];
//         // 将读取的所需列加入到JSON数组
//         data_content1.push(arry);
//      };
//     // 构建xlsx对象
//     let file1 = xlsx.build([{
//         name: 'coursera_excel1',
//         data: data_content1
//     }]);
//     fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'static', 'courseraExcel', 'excel1.xlsx' ), file1, 'binary');
//
//     // 生成统计过后的列表
//     let data_content2 = [
//         ['学员', '部门', '获取证书数量']
//     ]
//     // 写入
//     for(let val of result2){
//         let arry = [
//             val._id,
//             // result[i].department,
//             '',
//             val.num_tutorial,
//         ];
//         data_content2.push(arry);
//     }
//     let file2 = xlsx.build([{
//         name: 'coursera_excel2',
//         data: data_content2
//     }]);
//     fs.writeFileSync(path.join(__dirname, '..', '..', '..', 'static','courseraExcel','excel2.xlsx' ), file2, 'binary');
//     // console.log('写入完成');
// };


    
// const getCompanyUserDepartment = async () =>{
//     // 北京子公司：
//     // "appKey": "appPnVYibiN385893",
//     // "appSecret": "d#rpTBUem77@anwCf$1c"
//
//     // 香港子公司
//     // "appKey": "appPYpTEfkc033218",
//     // "appSecret": "CrW5RryWJFgW4d22!nhj"
//
//     // 成都子公司
//     // "appKey": "appqaRSMfFe023353",
//     // "appSecret": "5$QTVuDHIeuX@Yc6YR6J"
//     let beijingDepartmentId = await getDepartmentFormXinRen('appPnVYibiN385893','d#rpTBUem77@anwCf$1c');
//         // let hongkongDepartmentId = await getDepartmentFormXinRen('appPYpTEfkc033218','CrW5RryWJFgW4d22!nhj');
//         // let chengduDepartmentId = await getDepartmentFormXinRen('appqaRSMfFe023353','5$QTVuDHIeuX@Yc6YR6J');
//         console.log(beijingDepartmentId)
//     let beijingCompany = await getUserDepartmentFromXinRen('appPnVYibiN385893','d#rpTBUem77@anwCf$1c',beijingDepartmentId);
//     // console.log(beijingCompany)
//         // let hongkongCompany = await getUserDepartmentFromXinRen('appPYpTEfkc033218','CrW5RryWJFgW4d22!nhj',hongkongDepartmentId);
//        // let chengduCompany = await getUserDepartmentFromXinRen('appqaRSMfFe023353','5$QTVuDHIeuX@Yc6YR6J',chengduDepartmentId);
//         // console.log(hongkongDepartmentId)
//     // return beijingCompany.concat(hongkongCompany, chengduCompany)
//
// }
//
// // 获取薪人薪事员工部门信息
// const getUserDepartmentFromXinRen = async (APP_KEY,APP_SECRIPT,departmentId)=>{
//     const URL = 'https://api.xinrenxinshi.com/v2/employee/getEmployeeListByDepartmentId'
//     // const APP_KEY = 'appPnVYibiN385893'
//     // const APP_SECRIPT = 'd#rpTBUem77@anwCf$1c'
//
//     let params = {
//       appKey: urlencode(APP_KEY),
//       timestamp: urlencode(Date.now()),
//       containSubDept: 1,
//       id: departmentId
//     }
//
//     const paramString = queryString.stringify(params)
//     // console.log(paramString)
//     const sign = hmacsha1(APP_SECRIPT, paramString)
//     // console.log(sign)
//     // console.log(`${URL}?${queryString.stringify(params)}&sign=${urlencode(sign)}`)
//
//     let resp = await Request.get(`${URL}?${queryString.stringify(params)}&sign=${urlencode(sign)}`)
//     console.log(resp)
//     return resp.data;
//     // https.get(`${URL}?${queryString.stringify(params)}&sign=${urlencode(sign)}`, (resp) => {
//     //   let data = '';
//     //   //
//     //   // A chunk of data has been recieved.
//     //   resp.on('data', (chunk) => {
//     //     data += chunk;
//     //   });
//
//     //   // The whole response has been received. Print out the result.
//     //   resp.on('end', () => {
//     //     console.log(JSON.parse(data));
//     //   });
//     // })
// }
//
// // 获取部门id
// const getDepartmentFormXinRen = async (APP_KEY,APP_SECRIPT)=>{
//     // https://api.xinrenxinshi.com/v2/company/getDepartmentList?appKey=appId 007&timestamp=1479716429871&sign=asdf787a6d8f9a9sd8f0a8sd798df
//
//     const URL = 'https://api.xinrenxinshi.com/v2/company/getDepartmentList'
//     // const APP_KEY = 'appPnVYibiN385893'
//     // const APP_SECRIPT = 'd#rpTBUem77@anwCf$1c'
//
//     let params = {
//       appKey: urlencode(APP_KEY),
//       timestamp: urlencode(Date.now()),
//       // containSubDept: 1,
//       // id: '09e3cd860fb2416f989e574284a374fb'
//     }
//
//     const paramString = queryString.stringify(params)
//     // console.log(paramString)
//     const sign = hmacsha1(APP_SECRIPT, paramString)
//     // console.log(sign)
//     // console.log(`${URL}?${queryString.stringify(params)}&sign=${urlencode(sign)}`)
//
//
//     let resp = await Request.get(`${URL}?${queryString.stringify(params)}&sign=${urlencode(sign)}`),departmentId = '';
//     console.log(resp.data)
//     for(let val of resp.data){
//         if(val.parentId === '0'){
//             departmentId = val.departmentId;
//         }
//     }
//     return departmentId
// }












