import {CALL_API} from '../../../middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    TEST_TEST : null
});

export const test = () => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.TEST_TEST,
            url : API.TEST,
            data : {data : 'test'},
            success : data => {
                console.log(data);
            },
            fail : (data, status) => {
                console.log(status)
            }
        }
    }
}