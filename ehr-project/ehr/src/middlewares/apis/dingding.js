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
        DD_USER_LOGIN : `${SERVER}/user/pass/login_for_dd`,

        /**
         * 获取用户信息(Cookie)
         */
        DD_GET_USER_INFO : `${SERVER}/user/get_info_for_dd`,

        DINGDING_SEND_ROBOT_MESSAGE : `${SERVER}/dd/pass/send_robot_message`,
        DINGDING_SEND_ROBOT_MESSAGE_CV : `${SERVER}/dd/pass/send_robot_message_cv`,
        DINGDING_ESTABLISHWSCONNECT : `${SERVER}/dd/establish_ws_connect`,

    }
}