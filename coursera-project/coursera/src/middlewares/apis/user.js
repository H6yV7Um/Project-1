/**
 * 用户api
 * @param SERVER 服务器地址
 */
export const user = SERVER => {
    return {
        /**
         * 获取部门
         * @param ctx | data
         * @param id  主键
         * @param name  部门名
         * @param departmentId  部门ID
         * @param departmentIds  部门ID数组
         * @param isLeader  是否只选管理部门 (true时将只可选自己管理部门(包括子部门))
         * @param sort  排序规则
         * @param page  页数
         * @param limit  获取条数
         * @return 不分页:[{DEPARTMENT}]  分页:{isGetAll:是否获取完, departments:[{DEPARTMENT}]}
         */
        USER_GET_DEPARTMENTS            :   `${SERVER}/user/get_departments`,

        /**
         * 获取成员列表
         * @param isLeader 是否只选管理成员 (true时将只可选自己管理部门成员(包括子部门成员))
         */
        USER_GET_USERS                  :   `${SERVER}/user/get_users`,
    }
}