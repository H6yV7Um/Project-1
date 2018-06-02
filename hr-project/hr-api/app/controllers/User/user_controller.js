const response = require('../../../middlewares/response');
const errorNames = require('../../../middlewares/errorNames');
// 引入模型层
const User = require('../../models/User/user');
const Exam = require('../../models/Exam/exam');

// 获取用户
exports.getUser = async (ctx, next) => {
    let data = {
        "username": "阿，希爸",
        "age": 30
    }
    //如果id != 1抛出API 异常
    if(ctx.query.id != 1){
        response.error(ctx, errorNames.USER_NOT_EXIST);
    }else{
        response.success(ctx, data);
    }
}

// 用户注册
exports.registerUser = async (ctx, next) => {
    let userData = null,
        newUser = null,
        newExam = null,
        isError = false,
        error = null;
    if (!ctx.query.name || !ctx.query.email || !ctx.query.phone) {
        response.error(ctx, errorNames.USER_INFO_NOT_COMPLETE);
    } else {
        // 用户表
        newUser = new User({
            name : ctx.query.name,
            email : ctx.query.email,
            phone : ctx.query.phone,
            random_code : generateCode(false, 5)
        });
        userData = await newUser.save((err, docs) => {
            if (err) {
                error = errorNames.SEVER_INTERNAL_EXCEPTION;
                isError = true;

            }else{
                return docs;
            }
        });
        if(!isError) {
            // 考试表
            newExam = new Exam({
                userID : userData._id,
                exam : {
                    order : {result : null},
                    calculator : {
                        1 : null,
                        2 : null
                    }
                }
            });
            newExam.save(err => {
                if(err) {
                    error = errorNames.SEVER_INTERNAL_EXCEPTION;
                    isError = true;
                }
            });
        }
        if(isError) {
            response.error(ctx, error);
        }else{
            response.success(ctx, userData);
        }
    }
}

// 用户登录
exports.login = async (ctx, next) => {
    let isError = false,
        userData = null,
        error = null;
    User.findOne({
        phone : ctx.query.phone
    }, (err, docs) => {
        if (docs) {  // 账号存在
            if (docs.random_code == ctx.query.random_code) {  // 密码和账号匹配,已确认用户身份
                userData = docs;
            } else {
                error = errorNames.USER_CODE_INCORRECT
                isError = true;
            }
        } else {
            error = errorNames.USER_NOT_EXIST
            isError = true;
        }
    })
    if(isError) {
        response.error(ctx, error);
    }else{
        response.success(ctx, userData);
    }
}

function generateCode(randomFlag, min, max) {
    let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if (randomFlag) {
        range = Math.round(Math.random() * (max - min)) + min;
    }
    for (let i = 0; i < range; i++) {
        pos = Math.round(Math.random() * (arr.length - 1));
        str += arr[pos];
    }
    return str.toUpperCase();
}

