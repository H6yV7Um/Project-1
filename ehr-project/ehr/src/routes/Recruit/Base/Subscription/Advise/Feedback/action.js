import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    ADVISE_FEEDBACK_GET_JOBSTYPES          :   null
});

/**
 * 新增留言
 * @param type 类型 ['关于游戏','关于官网','关于tap4fun','关于招聘','其他']
 * @param content 内容
 * @param email 邮箱
 */
export const messageAdd = (_content, _email) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.ADVISE_FEEDBACK_GET_JOBSTYPES,
            url : API.RECRUITMENT_MESSAGE_ADD,
            data : {type : '关于招聘', content : _content, email : _email}
        }
    }
}






