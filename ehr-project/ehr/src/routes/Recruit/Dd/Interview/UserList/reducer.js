import {ACTION_TYPES} from './action';

const initialState = {
    // 用户列表数据
    userList : null,
    // 是否在取用户数据
    fetchGetuser : null,
    // 是否还有数据
    hasuserData : null,
    // 职位数据
    jobs : null,
    // hr数据
    hrs : null,
    // 职位分类数据
    jobTypes : null,
    // 是否为空
    isEmpty : null

}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取用户列表
        case `REQUEST_${ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER}`:
            if(action.request.isClear) {
                newState.userList = null;
            }
            newState.isEmpty = false;
            newState.hasuserData = true;
            newState.fetchGetuser = true;
            break;
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_WECHATUSER:
            newState.isEmpty = action.data.userList.length == 0 ? true : false;
            newState.hasuserData = !action.data.hasuserData ? false : true;
            newState.userList = newState.userList ? newState.userList.concat(action.data.userList) : newState.userList = action.data.userList;
            newState.fetchGetuser = false;
            break;

        // 获取职位数据
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOBS:
            newState.jobs = action.data;
            break;

        // 获取hr联系方式
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_HRCONTACT:
            newState.hrs = action.data;
            break;

        // 获取职位分类数据
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_GET_JOB_TYPE:
            newState.jobTypes = action.data;
            break;

        // 修改用户的流程状态 标记为已入职 标记为未通过
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_CHANGE_STATE:
            newState.userList.map(v => {
                if(v.openid == action.request.openid) {
                    v.state = action.request.state;
                }
            })
            break;

        // 发送面试邀请记录
        case ACTION_TYPES.RECRUIT_DD_INTERVIEW_USERLIST_SEND_MSG:
            newState.userList.map(v => {
                if(v.openid == action.request.queryData.openid) {
                    switch (action.request.queryData.interviewtype) {
                        case '技术面试':
                            v.state = 20;
                            break;
                        case '综合面试':
                            v.state = 30;
                            break;
                        case '终面':
                            v.state = 40;
                            break;
                    }
                }
            })
            break;
    }

    return {...newState};
}