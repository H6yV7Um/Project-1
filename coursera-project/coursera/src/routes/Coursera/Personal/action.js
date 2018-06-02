import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
	PERSONAL_SEARCH_LIST: null,
	PERSONAL_CLEAR: null
});
export const searchPersonalList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.PERSONAL_SEARCH_LIST,
            url : API.GET_SEARCH_PERSONAL_LIST,
            data,
            success,
            fail
        }
    }
}
export const clear = () => {
    return {
        type : ACTION_TYPES.PERSONAL_CLEAR,
    }
}