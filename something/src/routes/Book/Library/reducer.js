import {ACTION_TYPES} from './action';

const initialState = {
    // Tap4fun推荐
    recommend           :   null,
    // 猜你喜欢
    like                :   null,
    hasRecommendData    :   false,
    fetchGetRecommend   :   false,
    gotBookIds          :   null,
    // 搜索信息
    searchInfo          :   {
        // 默认搜索
        default : "悟空传",
        //
        info : [{
            id      : 1,
            title   : '历史搜索',
            isOrder : false,
            data  : [{
                id   :   1,
                name :   '月亮与六便士'
            },{
                id   :   2,
                name :   '嫌疑人X的献身'
            }]
        },{
            id    : 2,
            title : '热门搜索',
            isOrder : true,
            data  : [{
                id   :   1,
                name :   '哈利波特'
            },{
                id   :   2,
                name :   '鬼吹灯'
            },{
                id   :   3,
                name :   '圣王'
            },{
                id   :   4,
                name :   '北京北京'
            },{
                id   :   5,
                name :   '特工皇妃楚乔传'
            },{
                id   :   6,
                name :   '东野圭吾'
            },{
                id   :   7,
                name :   '幸福的哲学'
            },{
                id   :   8,
                name :   '重生'
            },{
                id   :   9,
                name :   '顾西爵'
            },{
                id   :   10,
                name :   '红楼梦'
            }]
        }]
    }
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 获取Tap4fun推荐
        case ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND:
            newState.recommend = action.data.books;
            break;

        // 获取猜你喜欢
        case ACTION_TYPES.BOOK_INDEX_GET_LIKE:
            newState.like = action.data.books;
            break;

        // case `REQUEST_${ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND}`:
        //     newState.fetchGetRecommend = true;
        //     break;
        // case `FAIL_${ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND}`:
        //     newState.fetchGetRecommend = false;
        //     break;
        // case ACTION_TYPES.BOOK_INDEX_GET_RECOMMEND:
        //     newState.fetchGetRecommend = false;
        //     newState.recommend = newState.recommend.concat(action.data.books);
        //     newState.gotBookIds = action.data.got_ids;
        //     newState.hasRecommendData = action.data.is_end ? false : true;
        //     break;
    }

    return {...newState};
}