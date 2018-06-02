import {ACTION_TYPES} from './action';
import browserAttr from 'utils/browserAttr'
let ismobile = browserAttr.versions.mobile//判断设备类型
const initialState = {
 	searchPage: 1,
 	fetchSearchList: false,
 	itemList: [],
 	searchIsEnd: false,
 	tableTotalCount: 1
}
export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
         // 获取个人或者部门的courseral
         
        case `REQUEST_${ACTION_TYPES.PERSONAL_SEARCH_LIST}`:
            if(!ismobile)
            {
                newState.itemList = []
            }
            newState.fetchSearchList = true;
            // 重置列表 
            break;
        case `FAIL_${ACTION_TYPES.PERSONAL_SEARCH_LIST}`:
            newState.fetchSearchList = false;
            break;
        case ACTION_TYPES.PERSONAL_SEARCH_LIST:
            newState.fetchSearchList = false
            let isSearchListExist = false//判断是否有重复的数据
            for(let val of newState.itemList)
            {
                for(let d of action.data.data)
                {
                    if(val._id == d._id)
                    {
                        isSearchListExist = true
                        break;
                    }
                }
            }
            if(!isSearchListExist)
            {
                //非第一次筛选
                newState.itemList = (ismobile?newState.itemList.concat(action.data.data):action.data.data);
            }
            newState.searchIsEnd = action.data.search_is_end
            newState.searchPage = action.data.page
            newState.tableTotalCount = action.data.search_count
            break;

        case ACTION_TYPES.PERSONAL_CLEAR:
            newState.itemList = [];
            newState.searchPage = [];
            newState.searchIsEnd = false;
            newState.tableTotalCount = 1;
            // 重置列表 
            break;
    }

    return {...newState};
}