// const SERVER = process.env.NODE_ENV == 'development' ? 'http://172.20.120.36:3010' : 'http://app-api.tap4fun.com';
const SERVER = 'http://app-api.tap4fun.com';

    module.exports = {
    // 请求头
    HEADER : {'Content-type' : 'application/json; charset=utf-8'},

    /**
     * 钉钉登录
     * @param code 钉钉免登code
     */
    DD_LOGIN : `${SERVER}/dd/pass/login?app_enterprise=${process.env.NODE_ENV == 'development' ? 'something' : 'tap4fun'}`,

    /**
     * 钉钉获取成员信息
     * @param access_token 请求token
     */
    DD_GET_USER_INFO : `${SERVER}/dd/get_user_info?app_enterprise=${process.env.NODE_ENV == 'development' ? 'something' : 'tap4fun'}`,

    /**
     * 钉钉获取所有成员信息
     * @param access_token 请求token
     */
    DD_GET_USERS_INFO : `${SERVER}/dd/get_users_info?app_enterprise=${process.env.NODE_ENV == 'development' ? 'something' : 'tap4fun'}`,

    /**
     * 钉钉获取部门信息
     * @param access_token 请求token
     * @param department_ids 部门ID列表
     */
    DD_GET_DEPARTMENTS_INFO : `${SERVER}/dd/get_departments_info?app_enterprise=${process.env.NODE_ENV == 'development' ? 'something' : 'tap4fun'}`,
};