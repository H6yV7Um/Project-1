/**
 * 招聘api
 * @param SERVER 服务器地址
 */
export const recruitment = SERVER => {
    return {
        /**
         * 获取职位分类列表
         * @param type [1: 所有, 2: 社招, 3: 校招, 4: 实习]
         */
        RECRUITMENT_JOB_TYPES_GET : `${SERVER}/api/jobTypes/get`,

        /**
         * 获取职位列表
         * @param jobTypeId 职位分类ID
         */
        RECRUITMENT_JOBS_GET : `${SERVER}/api/jobs/get`,

        /**
         * 获取职位详情
         * @param jobId 职位ID
         */
        RECRUITMENT_JOB_GET : `${SERVER}/api/job/get`,

        /**
         * 新增留言
         * @param type 类型 ['关于游戏','关于官网','关于tap4fun','关于招聘','其他']
         * @param content 内容
         * @param email 邮箱
         */
        RECRUITMENT_MESSAGE_ADD : `${SERVER}/api/message/add`,
    }
}