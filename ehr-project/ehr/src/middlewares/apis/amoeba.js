export const amoeba = SERVER => {
    return {
        /**
         * 导入阿米巴流程
         */
        AMOEBA_IMPORT  : `${SERVER}/amoeba/import`,

        /**
         * 获取阿米巴
         * @param ctx | data
         * @param id  主键
         * @param userId  发布人ID
         * @param userIds  发布人ID数组
         * @param departmentId  部门ID
         * @param departmentIds  部门ID数组
         * @param date  起止日期(闭区间) 如[2016, 2017]
         * @param sort  排序规则
         * @param page  页数
         * @param limit  获取条数
         * @return 不分页:[{AMOEBA}]  分页:{isGetAll:是否获取完, amoeba:[{AMOEBA}]}
         */
        AMOEBA_GET : `${SERVER}/amoeba/get`,
    }
}