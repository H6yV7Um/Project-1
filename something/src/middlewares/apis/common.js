export const common = SERVER => {
    return {
        TEST : `${SERVER}/test/test`,

        /**
         * ---temp---会议签到
         */
        TEMP_MEETING_VOTE : `${SERVER}/user/temp_meeting_vote`,

        /**
         * 获取钉钉签名
         */
        COMMON_GET_SIGNATURE : `${SERVER}/dd/get_signature`,

        /**
         * 上传文件
         * @param param('?=obj') 文件所属名 ['car', 'book']
         * @param param('&=fileType') 文件类型 ['image', 'video', 'file']
         */
        COMMON_UPLOAD_FILE : `${SERVER}/upload_file`,
    }
}