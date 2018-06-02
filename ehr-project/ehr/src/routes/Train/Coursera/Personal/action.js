import {CALL_API} from 'middlewares/fetch';
import API from 'middlewares/api';
import keyMirror from 'keymirror';
export const ACTION_TYPES = keyMirror({
	TRAIN_COURSERA_PERSONAL_SEARCH_LIST: null,
	TRAIN_COURSERA_PERSONAL_CLEAR: null
});
export const searchPersonalList = (data, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TRAIN_COURSERA_PERSONAL_SEARCH_LIST,
            url : API.TRAIN_COURSERA_GET_SEARCH_PERSONAL_LIST,
            data,
            success,
            fail
        }
    }
}
export const clear = () => {
    return {
        type : ACTION_TYPES.TRAIN_COURSERA_PERSONAL_CLEAR,
    }
}