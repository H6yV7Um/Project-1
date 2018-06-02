import {ACTION_TYPES} from './action';

const initialState = {
    // 获取我的书架
    myBooks         :   null
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type){
        // 获取我的书架
        case ACTION_TYPES.BOOK_PERSONALCENTER_GET_MYBOOKS:
            newState.myBooks = action.data.books;
            break;
    }
    return {...newState};
}