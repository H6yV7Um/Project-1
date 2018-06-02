import {CALL_API} from '../../../middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
    // 登录
    USER_LOGINDD_LOGIN : null,
});

export const login = (code, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.USER_LOGINDD_LOGIN,
            url : API.DD_USER_LOGIN,
            data : {code, isDevelopment : true},
            success
        }
    }
}

