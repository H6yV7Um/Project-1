export const recruit = SERVER => {
    return {
        /**
         * 获取HR联系方式
         */
        RECRUIT_GET_HR_CONTACT      :   `${SERVER}/recruit/pass/get_hr_contact`,
        /**
         * 添加HR联系方式
         */
        RECRUIT_ADD_HR_CONTACT      :   `${SERVER}/recruit/pass/add_hr_contact`,
        /**
         * 删除HR联系方式
         */
        RECRUIT_DELETE_HR_CONTACT   :   `${SERVER}/recruit/pass/delete_hr_contact`,

        /**
         * 获取职位列表
         */
        RECRUIT_GET_JOB             :   `${SERVER}/recruit/pass/get_job`,
        /**
         * 根据职位id获取职位
         */
        RECRUIT_GET_JOB_BY_ID : `${SERVER}/recruit/pass/get_job_by_id`,
        /**
         * 添加职位
         */
        RECRUIT_ADD_JOB : `${SERVER}/recruit/pass/add_job`,
        /**
         * 添加职位
         */
        RECRUIT_DELETE_JOB : `${SERVER}/recruit/pass/delete_job`,
        /**
         * 获取职位类型列表
         */
        RECRUIT_GET_JOB_TYPE : `${SERVER}/recruit/pass/get_job_type`,
        /**
         * 删除职位类型
         */
        RECRUIT_DELETE_JOB_TYPE : `${SERVER}/recruit/pass/delete_job_type`,
        /**
         * 添加职位类型列表
         */
        RECRUIT_ADD_JOB_TYPE : `${SERVER}/recruit/pass/add_job_type`,


        /**
         * 获取简历详情
         * @param openid 微信用户唯一身份标识
         */
        RECRUIT_GET_CV : `${SERVER}/user/pass/get_cv`,
        /**
         * 新增简历
         * @param resumeData 简历数据
         * @param WechatData 微信数据
         */
        RECRUIT_ADD_CV : `${SERVER}/user/pass/add_cv`,
        /**
         * 更新简历
         * @param openid 微信用户唯一身份标识
         * @param ResumeData 简历数据
         */
        RECRUIT_UPDATE_CV : `${SERVER}/user/pass/update_cv`,
        /**
         * 更新签到状态为已签到
         * @param openid 微信用户唯一身份标识
         */
        RECRUIT_CHECK_IN : `${SERVER}/user/pass/check_in`,
        /**
         * 更新签到状态为未签到
         * @param openid 微信用户唯一身份标识
         */
        RECRUIT_UN_CHECK_IN : `${SERVER}/user/pass/un_check_in`,
        /**
         * 查询用户是否签到
         * @param openid 微信用户唯一身份标识
         */
        RECRUIT_IS_CHECK_IN : `${SERVER}/user/pass/is_check_in`,
        /**
         * 根据姓名模糊查询微信中的用户
         * @param keyword 姓名中的某一个字
         */
        RECRUIT_FIND_WECHAT_USER_BY_NAME : `${SERVER}/user/pass/find_wechat_user_by_name`,
        /**
         * 得到offer的相关信息
         * @param data  offer信息
         */
        RECRUIT_OFFER_SEND_ADD_OFFER_INFO : `${SERVER}/recruit/offer/add_offer_info`,
        /**
         * 列出简历库中的所有简历
         *
         */
        RECRUIT_GET_CRAWLING_CV : `${SERVER}/user/pass/crawling_cv/get_cv`,
        /**
         * 根据简历ID查询简历详细信息
         *@param keyword 简历ID
         */
        RECRUIT_GET_CRAWLING_CV_BY_ID : `${SERVER}/user/pass/crawling_cv/get_cv_by_id`,
        /**
         * 根据输入条件进行模糊查询
         *@param
         */
        RECRUIT_GET_CRAWLING_CV_BY_CONDITION :`${SERVER}/user/pass/crawling_cv/get_cv_by_condition`,
        /**
         * 改变用户的状态
         * @param open_id 用户微信号转换后的id
         * @param state 需要转换的状态 [10,20,30]
         */
        RECRUIT_CHANGE_STATE : `${SERVER}/user/pass/change_state`

    }
}