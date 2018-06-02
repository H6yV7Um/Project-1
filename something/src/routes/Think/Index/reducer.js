import {ACTION_TYPES} from './action';

const initialState = {
    // 列表条件
    condition : {
        // 分类
        type : 2,
        // 关键字
        keywords : null,
        // 标签ID集合
        thinkTagIds : null,
        // 周期状态 (100：待审核；200：通过正在处理；300：未通过；400：已处理)
        statusLife : null,
        // 排序名[popularity=>人气数, yes=>支持/赞数, no=>不支持数, time=>发布时间]
        orderName : 'time',
        // 排序方式[desc=>降序, asc=>升序]
        orderType : 'desc'
    },
    // 想法列表
    thinks : [],
    // 已获取想法ID集合
    gotThinkIds : null,
    // 是否取尽列表
    isEnd : false
}

export default (state = initialState, action) => {
    let newState = state;
    switch (action.type)
    {
        // 设置列表条件
        case ACTION_TYPES.THINK_INDEX_SET_CONDITION:
            newState.condition = action.data.condition;
            break;

        // 获取列表
        case `REQUEST_${ACTION_TYPES.THINK_INDEX_GET_THINKS}`:
            newState.fetchGetThinks = true;
            newState.isEnd = false;
            // 重置列表
            if(action.request.isReset)
            {
                newState.thinks = [];
            }
            break;
        case `FAIL_${ACTION_TYPES.THINK_INDEX_GET_THINKS}`:
            newState.fetchGetThinks = false;
            break;
        case ACTION_TYPES.THINK_INDEX_GET_THINKS:
            newState.fetchGetThinks = false;
            newState.thinks = newState.thinks.concat(action.data.thinks);
            newState.isEnd = action.data.is_end;
            newState.gotThinkIds = action.data.got_think_ids;
            break;
    }

    return {...newState};
}