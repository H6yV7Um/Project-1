export const wechat = SERVER => {
    return {
        /**
         * 获取微信签名
         * @param code 微信免登code
         */
        WECHAT_GET_SIGNATURE            :   `${SERVER}/wechat/pass/get_signature`,
        /**
         * 微信公众号内发送模板消息
         * @param queryData 模板信息
         */
        WECHAT_SEND_MSG                 :   `${SERVER}/wechat/pass/send_msg`,
    }
}