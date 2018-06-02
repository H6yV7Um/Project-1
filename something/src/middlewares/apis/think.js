export const think = SERVER => {
    return {
        /**
         * 发表想法
         * @param type [1:心情, 2:建议, 3:征集]
         * @param content 描述
         * @param photos 配图集合
         * @param think_tag_ids 标签集合
         * @param department_admin_id 管理部门ID
         * @param department_see_ids 可见部门ID集合
         * @param is_anonymous 是否匿名
         * @param vote 投票集合
         */
        THINK_SAVE : `${SERVER}/think/save`,

        /**
         * 获取想法
         * @param null thinkId 想法ID (不为空时将忽略其他获取查询条件)
         * @param null keywords 关键字
         * @param null type 分类 (1:心情 2:建议 3:征集)
         * @param null thinkTagIds 标签ID集合
         * @param null statusLife 周期状态 (100：待审核；200：通过正在处理；300：未通过；400：已处理)
         * @param string gotThinkIds 已获取想法ID集合
         * @param bool|false isGetVoteInfo 是否获取投票信息 (仅征集有可能有)
         * @param bool|true isGetTagInfo 是否获取标签信息
         * @param bool|false isGetDepartmentInfo 是否获取部门信息
         * @param bool|false isGetDisposeInfo 是否获取处理信息
         * @param string orderName 排序名[popularity=>人气数, yes=>支持数, no=>不支持数, time=>发布时间] 默认time
         * @param string orderType 排序方式[desc=>降序, asc=>升序] 默认desc
         * @param string field 获取字段
         * @param int limit 获取条数 默认1
         */
        THINK_GET : `${SERVER}/think/get`,

        /**
         * 获取所有想法标签
         * @param commonNum 普通获取数
         * @param null type 分类 (1:心情 2:建议 3:征集)
         */
        THINK_TAG_GET_ALL : `${SERVER}/think/tag/get_all`,

        /**
         * 获取所有热门想法标签
         * @param null type 分类 (1:心情 2:建议 3:征集)
         */
        THINK_TAG_GET_HOT : `${SERVER}/think/tag/get_hot`,

        /**
         * 保存想法评论
         * @param review       评论
         */
        THINK_REVIEW_SAVE : `${SERVER}/think/review/save`,

        /**
         * 获取想法评论
         * @param thinkReviewId 评论ID
         * @param thinkId 想法ID
         * @param userId 用户ID
         * @param gotThinkReviewIds 已获取评论ID集合
         * @param isGetCount 是否获取总条数
         * @param bool|true isGetDetail 是否获取详情
         * @param int|20 limit 获取条数
         * @param string|asc order 排序(desc: 降序 asc: 升序)
         */
        THINK_REVIEW_GET : `${SERVER}/think/review/get`,

        /**
         * 删除想法评论
         * @param thinkReviewId 评论ID
         */
        THINK_REVIEW_DELETE : `${SERVER}/think/review/delete`,

        /**
         * 点赞想法评论
         * @param thinkReviewId 评论ID
         */
        THINK_REVIEW_OPEN_LIKE : `${SERVER}/think/review/open_like`,

        /**
         * 取消点赞想法评论
         * @param thinkReviewId 评论ID
         */
        THINK_REVIEW_CLOSE_LIKE : `${SERVER}/think/review/close_like`,

        /**
         * 保存想法评论回复
         * @param replyObjId 回复对象ID
         * @param replyObjType 回复对象类型 [review, reply]
         * @param reply 回复内容
         */
        THINK_REPLY_SAVE : `${SERVER}/think/reply/save`,

        /**
         * 删除想法评论回复
         * @param thinkReplyId 评论回复ID
         */
        THINK_REPLY_DELETE : `${SERVER}/think/reply/delete`,
    }
}