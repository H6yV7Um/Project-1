export const love = SERVER => {
    return {
        /**
         * 导入LOVE流程
         */
        LOVE_IMPORT  : `${SERVER}/love/import`,

        /**
         * 获取LOVE
         * @param ctx | data
         * @param id  主键
         * @param feedbackId  反馈ID
         * @param userId  发布人ID
         * @param userIds  发布人ID数组
         * @param departmentId  部门ID
         * @param departmentIds  部门ID数组
         * @param date  起止日期(闭区间) 如[2016, 2017]
         * @param sort  排序规则
         * @param page  页数
         * @param limit  获取条数
         * @param isGetFeedbackDetail  是否获取反馈详情(默认:false)
         * @return 不分页:[{LOVE}]  分页:{isGetAll:是否获取完, loves:[{LOVE}]}
         */
        LOVE_GET : `${SERVER}/love/get`,
    }
}