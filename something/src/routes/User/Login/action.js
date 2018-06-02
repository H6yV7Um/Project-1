import {CALL_API} from '../../../middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    USER_LOGIN_LOGIN : null
});

export const login = code => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.USER_LOGIN_LOGIN,
            url : API.USER_LOGIN,
            data : {code}
        }
    }
}

