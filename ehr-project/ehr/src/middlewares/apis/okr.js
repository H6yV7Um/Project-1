export const okr = SERVER => {
    return {
        /**
         * 导入OKR流程
         */
        OKR_IMPORT  : `${SERVER}/okr/import`,

        /**
         * 获取OKR
         * @param id  主键
         * @param feedbackId  反馈ID
         * @param userId  成员ID
         * @param userIds  成员ID数组
         * @param date  起止日期(闭区间) 如[2016, 2017]
         * @param sort  排序规则
         * @param page  页数
         * @param limit  获取条数
         * @param isGetUserInfo  是否获取成员信息(默认:false)
         * @param isGetFeedbackDetail  是否获取反馈详情(默认:false)
         * @return 不分页:[{OKR}]  分页:{isGetAll:是否获取完, okr:[{OKR}]}
         */
        OKR_GET : `${SERVER}/okr/get`,

        /**
         * 获取OKR分数
         * @param id  主键
         * @param userId  成员ID
         * @param period  时段 [年份, 阶段1, 阶段2]
         */
        OKR_SCORE_GET : `${SERVER}/okr/getScore`,
    }
}