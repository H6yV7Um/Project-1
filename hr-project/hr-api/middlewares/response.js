const errorNames = require('./errorNames');

/**
 * 自定义Api异常
 */

exports.error = (ctx, error_name) => {
    let error_info = errorNames.getErrorInfo(error_name);
    ctx.body = {
        status: {
            code: error_info.code,
            message: error_info.message
        },
        data: error_info.body
    }
}

exports.success = (ctx, data = []) => {
    // ctx.body = {
    //     code: 0,
    //     message: 'success',
    //     data: data
    // }
    ctx.body = {
        status: {
            code: 0,
            message: 'success'
        },
        data: data
    }
}