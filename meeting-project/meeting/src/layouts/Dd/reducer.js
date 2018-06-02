import {ACTION_TYPES} from './action'

const initialState = {
    // 用户信息
    userInfo : null
}

export default (state = initialState, action) => {
    let newState = state
    switch (action.type) {
        // 登录
    case ACTION_TYPES.LAYOUT_DD_LOGIN:
        newState.userInfo = action.data
        break

        // 获取用户信息
    case ACTION_TYPES.LAYOUT_DD_GET_USER_INFO:
        newState.userInfo = action.data
        break
    }

    return {...newState}
}
