import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
	BOOK_LIKELIST_GET_LIKE           :         null,
});

/**
 * 获取Tap4fun推荐
 * @param limit       条数
 * @param gotBookIds  已经获取到的数据的id
 * @returns {{}}
 */
export const getLike = (limit, gotBookIds) => {
	return {
		[CALL_API] : {
			type : ACTION_TYPES.BOOK_LIKELIST_GET_LIKE,
			url : API.BOOK_BOOKS_GET_LIKE,
			data : {gotBookIds, limit, isGetDetail : false}
		}
	}
}