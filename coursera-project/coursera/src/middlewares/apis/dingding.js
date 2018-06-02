export const dingding = SERVER => {
    return {
        /**
         * 获取钉钉签名
         */
        DD_GET_SIGNATURE : `http://something-api.nibirutech.com/dd/get_signature/isRelease/${process.env.NODE_ENV == 'development' ? 0 : 1}`,

        /**
         * 用户登录
         * @param code 钉钉免登code
         */
        DD_USER_LOGIN : `${SERVER}/user/pass/login`,

        /**
         * 获取用户信息
         */
        DD_GET_USER_INFO : `${SERVER}/user/get_user_info`

    }
}