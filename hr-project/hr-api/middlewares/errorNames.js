/**
 * API错误名称
 */
var ApiErrorNames = {};

ApiErrorNames.UNKNOW_ERROR = "unknowError";
// 用户相关
ApiErrorNames.USER_NOT_EXIST = "userNotExist";
ApiErrorNames.USER_CODE_INCORRECT = 'userCodeIncorrect';
ApiErrorNames.USER_INFO_NOT_COMPLETE = 'infoNotComplete';
// 服务器相关
ApiErrorNames.SEVER_INTERNAL_EXCEPTION = 'infoNotComplete';

/**
 * API错误名称对应的错误信息
 */
const error_map = new Map();
const error_code = 1;

error_map.set(ApiErrorNames.UNKNOW_ERROR, { code: error_code, message: '未知错误' });
// 用户相关
error_map.set(ApiErrorNames.USER_NOT_EXIST, { code: error_code, message: '用户不存在' });
error_map.set(ApiErrorNames.USER_INFO_NOT_COMPLETE, { code: error_code, message: '信息不完整!'});
error_map.set(ApiErrorNames.USER_CODE_INCORRECT, { code: error_code, message: '密码错误!' });
// 服务器相关
error_map.set(ApiErrorNames.SEVER_INTERNAL_EXCEPTION, { code: error_code, message: '服务器内部异常!' });



//根据错误名称获取错误信息
ApiErrorNames.getErrorInfo = (error_name) => {

    var error_info;

    if (error_name) {
        error_info = error_map.get(error_name);
    }

    //如果没有对应的错误信息，默认'未知错误'
    if (!error_info) {
        error_name = UNKNOW_ERROR;
        error_info = error_map.get(error_name);
    }

    return error_info;
}

module.exports = ApiErrorNames;
