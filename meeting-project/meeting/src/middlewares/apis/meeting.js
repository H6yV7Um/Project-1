/**
 * 会议
 * @param SERVER 服务器地址
 */
export const meeting = SERVER => {
    return {
        // 新增会议申请
        APP_MEETING: `${SERVER}/meetings`,

        /**
         * 更新会议室的状态
         * @param nextStatus 下一状态 [1:通过, 2:未通过, 3:审批中, 4:已取消]
         * @param ids 会议申请ID数组
         * @param passMessage 未通过理由
         */
        APP_UPDATE_MEETING_STATUS: `${SERVER}/meetings`
    }
}
