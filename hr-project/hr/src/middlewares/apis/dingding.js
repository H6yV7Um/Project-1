export const dingding = SERVER => {
    return {
        /**
         * 获取钉钉签名
         */
        // DD_GET_SIGNATURE : `http://something-api.nibirutech.com/dd/get_signature/isRelease/${process.env.NODE_ENV == 'development' ? 0 : 1}`
        DD_GET_SIGNATURE : `${SERVER}/dd/get_signature`
    }
}