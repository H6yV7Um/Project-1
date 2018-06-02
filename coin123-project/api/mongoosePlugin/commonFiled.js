module.exports = exports = function commonFiledPlugin(schema) {
  schema.add({
    // 创建时间
    createdAt: {
      type: Number,
    },
    // 修改时间
    updatedAt: {
      type: Number,
    },
    // 删除时间
    deletedAt: {
      type: Number
    },
    status: {
      type: Number,
      // -1 删除，0 无效， 1有效
      default: 1,
      enum: [-1, 0, 1]
    },
    // 去掉__v
    __v: {
      type: Number,
      select: false
    }
  })
}
