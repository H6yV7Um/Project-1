import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取标签
    THINK_INDEX_GET_TAG             :   null,
    // 设置列表条件
    THINK_INDEX_SET_CONDITION       :   null,
    // 获取列表
    THINK_INDEX_GET_THINKS          :   null
});

/**
 * 获取热门标签
 * @param type  分类 (1:心情 2:建议 3:征集)
 * @param success
 * @returns {{}}
 */
export const getTag = (type, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_INDEX_GET_TAG,
            url : API.THINK_TAG_GET_HOT,
            data : {type},
            success
        }
    }
}

// 设置列表条件
export const setCondition = condition => {
    return {
        type : ACTION_TYPES.THINK_INDEX_SET_CONDITION,
        data : {condition}
    }
}

/**
 * 获取想法列表
 * @param condition.type 分类 (1:建议; 2:征集)
 * @param condition.keywords 关键字
 * @param condition.thinkTagIds 标签ID集合
 * @param condition.statusLife 周期状态 (100：待审核；200：通过正在处理；300：未通过；400：已处理)
 * @param condition.orderName 排序名[popularity=>人气数, yes=>支持数, no=>不支持数, time=>发布时间]
 * @param condition.orderType 排序方式[desc=>降序, asc=>升序]
 * @param gotThinkIds 已获取想法ID集合
 * @param isReset   是否重置列表
 * @returns {{}}
 */
export const getThinks = (condition, gotThinkIds, isReset) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_INDEX_GET_THINKS,
            url : API.THINK_GET,
            data : {...condition, gotThinkIds : isReset ? null : gotThinkIds, limit : 20, isReset}
        }
    }
}






