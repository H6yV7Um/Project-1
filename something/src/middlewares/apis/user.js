export const user = SERVER => {
    return {
        /**
         * 用户登录
         * @param code 钉钉免登code
         */
        USER_LOGIN : `${SERVER}/user/login`,

        /**
         * 获取用户信息(Cookie)
         */
        USER_GET_INFO : `${SERVER}/user/get_info`,

        /**
         * 车牌号查询用户
         * @param num 车牌号
         */
        USER_FIND_FOR_CAR_NUM : `${SERVER}/user/find_for_car_num`
    }
}