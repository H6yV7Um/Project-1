import {CALL_API} from 'middlewares/fetch';
import API from '../../../middlewares/api';
import keyMirror from 'keymirror';

export const ACTION_TYPES = keyMirror({
    // 获取标签
    THINK_PUBLISH_GET_TAG           :   null,
    // 发表想法
    THINK_PUBLISH_PUBLISH           :   null,
});

/**
 * 获取标签
 * @param type  分类 (1:心情 2:建议 3:征集)
 * @param success
 * @returns {{}}
 */
export const getTagData = (type, success) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_PUBLISH_GET_TAG,
            url : API.THINK_TAG_GET_ALL,
            data : {type},
            success
        }
    }
}

/**
 * 发表想法
 * @param think.type [1:建议, 2:征集]
 * @param think.content 描述
 * @param think.photos 配图集合
 * @param think.think_tag_ids 标签集合
 * @param think.department_admin_id 管理部门ID
 * @param think.department_see_ids 可见部门ID集合
 * @param think.is_anonymous 是否匿名
 * @param think.vote 投票集合
 */
export const publish = (think, success, fail) => {
    return {
        [CALL_API] : {
            type : ACTION_TYPES.THINK_PUBLISH_PUBLISH,
            url : API.THINK_SAVE,
            data : {think},
            success,
            fail
        }
    }
}






