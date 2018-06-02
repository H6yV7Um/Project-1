/**
 * 格式化获取会议记录的条件
 * @param {string} meetingRoom 会议室名称
 * @param {number} date 会议室申请的日期
 * @param {number} status  审批状态
 * @param {number} page  第几页
 * @param {number} limit 每页的条数
 * @param {id} 根据数据库id查询某一条数据
 * @return {string} 返回查询条件
 */
export default function (conditions) {
    let conditionArray = []
    let {meetingRoom, date, status, page, limit} = conditions
    if (meetingRoom) {
        for (let r of meetingRoom) {
            conditionArray.push(`meetingRoom=${r}`)
        }
    }
    if (date) {
        conditionArray.push(`date=${date}`)
    }
    if (status) {
        for (let s of status) {
            conditionArray.push(`status=${s}`)
        }
    }
    if (page) {
        conditionArray.push(`page=${page}`)
    } else {
        // 默认查询第一页
        conditionArray.push(`page=1`)
    }
    if (limit) {
        conditionArray.push(`limit=${limit}`)
    } else {
        // 默认查询50条
        conditionArray.push(`limit=50`)
    }
    return `?${conditionArray.join('&')}`
}
