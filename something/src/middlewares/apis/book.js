export const book = SERVER => {
    return {
        /**
         * 获取书
         * @param name 书名
         * @param author 作者名
         */
        BOOK_GET : `${SERVER}/book/get`,

        /**
         * 获取书列表
         * @param type 列表类型 [1=>推荐, 2=>最热, 3=>最新]
         * @param name 书名(模糊)
         * @param tagIds 所属书签ID集合
         * @param gotBookIds 已获取书ID集合
         * @param limit 条数
         * @param isGetDetail 是否获取详情
         */
        BOOK_BOOKS_GET : `${SERVER}/book/books/get`,

        /**
         * 获取猜你喜欢列表
         * @param gotBookIds   已获取书ID集合
         * @param limit        条数
         * @param isGetDetail  是否获取详情
         */
        BOOK_BOOKS_GET_LIKE : `${SERVER}/book/books/get_like`,

        /**
         * 获取所有书标签
         * @param commonNum 普通获取数
         */
        BOOK_TAG_GET_ALL : `${SERVER}/book/tag/get_all`,

        /**
         * 获取推荐书信息
         * @param name 书名
         * @param author 作者名
         */
        BOOK_RECOMMEND_GET_INFO : `${SERVER}/book/recommend/get_info`,

        /**
         * 推荐书
         * @param book 书
         * @param recommend 推荐
         * @param score 评分
         * @param remind 提醒
         */
        BOOK_RECOMMEND_SAVE : `${SERVER}/book/recommend/save`,

        /**
         * 获取书详情
         * @param bookId 书ID
         */
        BOOK_GET_DETAIL : `${SERVER}/book/get_detail`,

        /**
         * 获取相似书
         * @param bookId 书ID
         * @param limit 获取条数
         * @param isGetOwn 是否获取自己操作过的(推荐、赞、收藏、转发)
         */
        BOOK_GET_AKIN : `${SERVER}/book/get_akin`,

        /**
         * 获取书sns信息
         * @param bookId 书ID
         */
        BOOK_GET_SNS : `${SERVER}/book/get_sns`,

        /**
         * 点赞书
         * @param bookId 书ID
         */
        BOOK_OPEN_LIKE : `${SERVER}/book/open_like`,

        /**
         * 取消点赞书
         * @param bookId 书ID
         */
        BOOK_CLOSE_LIKE : `${SERVER}/book/close_like`,

        /**
         * 收藏书
         * @param bookId 书ID
         */
        BOOK_OPEN_COLLECTION : `${SERVER}/book/open_collection`,

        /**
         * 取消收藏书
         * @param bookId 书ID
         */
        BOOK_CLOSE_COLLECTION : `${SERVER}/book/close_collection`,

        /**
         * 转发书
         * @param bookId 书ID
         * @param forward 转发书评内容
         */
        BOOK_OPEN_FORWARD : `${SERVER}/book/open_forward`,

        /**
         * 取消转发书
         * @param bookId 书ID
         */
        BOOK_CLOSE_FORWARD : `${SERVER}/book/close_forward`,

        /**
         * 保存评分 (提交、编辑)
         * @param score 评分
         */
        BOOK_SCORE_SAVE : `${SERVER}/book/score/save`,

        /**
         * 获取展示书评 (初始展示精彩和其他)
         * @param bookId 书ID
         */
        BOOK_REVIEW_GET_SHOW : `${SERVER}/book/review/get_show`,

        /**
         * 获取精彩书评
         * @param bookId 书ID
         * @param gotBookReviewIds 已获取书评ID集合
         * @param limit 获取条数
         */
        BOOK_REVIEW_GET_WONDERFUL : `${SERVER}/book/review/get_wonderful`,

        /**
         * 获取普通书评
         * @param bookId 书ID
         * @param gotBookReviewIds 已获取书评ID集合
         * @param limit 获取条数
         * @param order 排序 [desc: 降序 asc: 升序]
         */
        BOOK_REVIEW_GET_COMMON : `${SERVER}/book/review/get_common`,

        /**
         * 点赞书评
         * @param bookReviewId 书评ID
         */
        BOOK_REVIEW_OPEN_LIKE : `${SERVER}/book/review/open_like`,

        /**
         * 取消点赞书评
         * @param bookReviewId 书评ID
         */
        BOOK_REVIEW_CLOSE_LIKE : `${SERVER}/book/review/close_like`,

        /**
         * 关注书评
         * @param bookId 书ID
         */
        BOOK_REVIEW_OPEN_FOLLOW : `${SERVER}/book/review/open_follow`,

        /**
         * 取消关注书评
         * @param bookId 书ID
         */
        BOOK_REVIEW_CLOSE_FOLLOW : `${SERVER}/book/review/close_follow`,

        /**
         * 保存书评 (提交、编辑)
         * @param review 书评
         * @param isGetDetail 是否获取详情
         */
        BOOK_REVIEW_SAVE : `${SERVER}/book/review/save`,

        /**
         * 转发书评
         * @param bookReviewId 书评ID
         * @param forward 转发回复内容
         */
        BOOK_REVIEW_OPEN_FORWARD : `${SERVER}/book/review/open_forward`,

        /**
         * 取消转发书评
         * @param bookReviewId 书评ID
         */
        BOOK_REVIEW_CLOSE_FORWARD : `${SERVER}/book/review/close_forward`,

        /**
         * 删除书评
         * @param bookReviewId 书评ID
         */
        BOOK_REVIEW_DELETE : `${SERVER}/book/review/delete`,

        /**
         * 提交书评回复
         * @param replyObjId  回复对象ID
         * @param replyObjType 回复对象类型 [review, reply]
         * @param reply 回复内容
         * @param isForward 是否是转发回复
         */
        BOOK_REPLY_SUBMIT : `${SERVER}/book/reply/submit`,

        /**
         * 删除书评回复
         * @param bookReplyId 回复ID
         */
        BOOK_REPLY_DELETE : `${SERVER}/book/reply/delete`,

        /**
         * 获取书评回复列表
         * @param bookReviewId 书评ID
         * @param gotReplyIds 已获取回复ID集合
         * @param limit 条数
         * @param order 排序 [desc: 降序 asc: 升序]
         */
        BOOK_REPLIES_GET : `${SERVER}/book/replies/get`,
    }
}