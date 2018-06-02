import {ACTION_TYPES} from './action';

const initialState = {
	// 猜你喜欢
	like            :     [],
	hasLikeData     :     false,
	fetchGetLike    :     false,
	gotBookIds        :     null
}

export default (state = initialState, action) => {
	let newState = state;
	switch (action.type){
		case `REQUEST_${ACTION_TYPES.BOOK_LIKELIST_GET_LIKE}`:
			newState.fetchGetLike = true;
			break;
		case `FAIL_${ACTION_TYPES.BOOK_LIKELIST_GET_LIKE}`:
			newState.fetchGetLike = false;
			break;
		case ACTION_TYPES.BOOK_LIKELIST_GET_LIKE:
			newState.fetchGetLike = false;
			newState.like = newState.like.concat(action.data.books);
			newState.gotBookIds = action.data.got_ids;
			newState.hasLikeData = action.data.books.length == 0 ? false : true;
			break;
	}

	return {...newState};
}