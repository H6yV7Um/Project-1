import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    //设置Love筛选参数
    PERFORMANCE_DEPARTMENTS_SET_LOVE_ARGUMENTS : null,
});

/**
 * 设置参数
 * @param
    */
    export const setLoveArguments = loveArguments =>{
        return {
            type : ACTION_TYPES.PERFORMANCE_DEPARTMENTS_SET_LOVE_ARGUMENTS,
            data : {loveArguments}
        }
}







