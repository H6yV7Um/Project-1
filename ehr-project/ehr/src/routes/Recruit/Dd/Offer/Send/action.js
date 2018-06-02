import {CALL_API} from 'middlewares/fetch';
import API from '../../../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    RECRUIT_OFFER_INFO_ADD : null
});

/**
 * 发送offer相关信息
 * @param data  offer相关信息
 */
export const addOfferInfo = data => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.RECRUIT_OFFER_INFO_ADD,
            url : API.RECRUIT_OFFER_SEND_ADD_OFFER_INFO,
            data : {data},
        }
    }
}






