import {ACTION_TYPES} from './action';
import browserAttr from 'utils/browserAttr'
let ismobile = browserAttr.versions.mobile//判断设备类型

const initialState = {
   	itemList:[],
    isSearch: false,
    searchPage: 1,
    searchIsEnd: false,
    fetchSearchList: false,
   	page:1,
   	isEnd: false,
   	fetchGetCourseraList: false,
    fetchFilterList: false,
    isFilter: false,//判断是否处于筛选阶段
    filterIsEnd: false,
    filterPage: 1,
   	count:0,
    departments: [],
    tableTotalCount: 0,
    fetchGetSchool: false,
    school:[],
    fetchCourseraJson: false,
    isCourseraUrl: true,

    isgobackTrain: true,
    certificateurl: ''
}

export default (state = initialState, action) => {
    let newState = state;
    switch(action.type)
    {
         // 获取搜索列表
        case `REQUEST_${ACTION_TYPES.GET_SEARCH_LIST}`:
            if(!ismobile)
            {
                newState.itemList = []
            }
            newState.fetchSearchList = true;
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.GET_SEARCH_LIST}`:
            newState.fetchSearchList = false;
            break;
        case ACTION_TYPES.GET_SEARCH_LIST:
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
            if(action.request.firstTime)//判断是否是第一次进行筛选
            {
                newState.itemList = action.data.data
            }
            else
            {
                if(!isSearchListExist)
                {
                    //非第一次筛选
                    newState.itemList = (ismobile?newState.itemList.concat(action.data.data):action.data.data);
                }
            }
            newState.searchIsEnd = action.data.search_is_end
            newState.searchPage = action.data.page
            newState.tableTotalCount = action.data.search_count
            newState.isSearch = true
            newState.isFilter = false
            break;
         // 获取列表
        case `REQUEST_${ACTION_TYPES.GET_CONRSERA_LIST}`:
            newState.fetchGetCourseraList = true;
            newState.isEnd = false;
            if(!ismobile)
            {
                newState.itemList = []
            }
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.GET_CONRSERA_LIST}`:
            newState.fetchGetCourseraList = false;
            break;
        case ACTION_TYPES.GET_CONRSERA_LIST:
            newState.fetchGetCourseraList = false;
            let is = false//判断是否有重复的数据
            for(let val of newState.itemList)
            {
                for(let d of action.data.data)
                {
                    if(val._id == d._id)
                    {
                        is = true
                        break;
                    }
                }
            }
            if(!is)
            {
                newState.itemList = (ismobile?newState.itemList.concat(action.data.data):action.data.data);
            }
            newState.isEnd = action.data.is_end;
            newState.page = action.data.page;
            newState.count = action.data.count
            newState.tableTotalCount = action.data.count
            break;
        case ACTION_TYPES.INDEX_GET_DEPARTMENT:
            newState.departments = action.data
            break;
         // 获取filter列表
        case `REQUEST_${ACTION_TYPES.FILTER}`:
            newState.fetchFilterList = true;
            newState.itemList = []
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.FILTER}`:
            newState.fetchFilterList = false;
            break;
        case ACTION_TYPES.FILTER:
            newState.fetchFilterList = false
            let isFilterExist = false//判断是否有重复的数据
            for(let val of newState.itemList)
            {
                for(let d of action.data.data)
                {
                    if(val._id == d._id)
                    {
                        isFilterExist = true
                        break;
                    }
                }
            }
            if(action.request.firstTime)//判断是否是第一次进行筛选
            {
                newState.itemList = action.data.data
            }
            else
            {
                //非第一次筛选
                if(!isFilterExist)
                {
                    newState.itemList = (ismobile?newState.itemList.concat(action.data.data):action.data.data);
                }
            }
            newState.filterIsEnd = action.data.filter_is_end
            newState.filterPage = action.data.page
            newState.tableTotalCount = action.data.filter_count
            newState.isFilter = true
            newState.isSearch = false
            break;
        //组件销毁时重置数据
        case ACTION_TYPES.INDEX_CLEAR:
                newState.itemList = []     
                newState.isSearch = false
                newState.searchPage = 1
                newState.searchIsEnd = false
                newState.fetchSearchList = false

                newState.page = 1
                newState.isEnd = false
                newState.fetchGetCourseraList = false

                newState.fetchFilterList = false
                newState.isFilter = false//判断是否处于筛选阶段
                newState.filterIsEnd = false
                newState.filterPage = 1

                newState.count = 0
                newState.departments = []

                newState.tableTotalCount = 0
                break;
         // 获取学校名称
        case `REQUEST_${ACTION_TYPES.INDEX_GET_SCHOOL}`:
            newState.fetchGetSchool = true;
            // 重置列表
            break;
        case `FAIL_${ACTION_TYPES.INDEX_GET_SCHOOL}`:
            newState.fetchGetSchool = false;
            break;
        case ACTION_TYPES.INDEX_GET_SCHOOL:
            newState.fetchGetSchool = false;
            newState.school = action.data
            break;
        // 获取搜索列表
        case `REQUEST_${ACTION_TYPES.GET_COURSERA_JSON}`:
            newState.fetchCourseraJson= true;
            newState.isCourseraUrl = true
            break;
        case `FAIL_${ACTION_TYPES.GET_COURSERA_JSON}`:
            newState.fetchCourseraJson= false;
            newState.isCourseraUrl = false
            break;
        case ACTION_TYPES.GET_COURSERA_JSON:
            newState.fetchCourseraJson= false
            // 如果没有匹配成功
            if(action.data.errorCode)
            {
                newState.isCourseraUrl = false
            }
            else
            {
                newState.isCourseraUrl = true
            }
            break;

        // 判断是否进入页面或者返回到首页
        case ACTION_TYPES.GET_GO_BACK_TRAIN:
            newState.isgobackTrain= action.data.isgobackTrain;
            newState.certificateurl = action.data.certificateurl;
            break;

    }
    return {...newState};
}