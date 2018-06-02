const mongoose = require('mongoose')
mongoose.plugin(require('../../../mongoosePlugin/commonFiled'))
// 保存最原始的数据
const Schema = new mongoose.Schema({
    // 排名
    ranking: {
        type: Number,
        required: true
    },
    // 币的英文名 eg: Bitcoin
    name: {
        type: String,
        required: true
    },
    // 币的中文名
    nameCn: {
        type: String
    },
    // 代币简称
    token: {
        type: String,
        required: true
    },
    exchangeName: {
        type: String,
        required: true
    },
    exchangeNameCn: {
        type: String,
    }
})
// 根据币的中英文简称关键字搜索币
Schema.statics.findByKeyword = async function (keyword, limit, cb) {
    // 不区分大小写
    const reg = new RegExp(keyword, 'i')
    if (limit) {
        return await this.find({
            $or: [
                {
                    name: {
                        $regex: reg
                    }
                },
                {
                    nameCn: {
                        $regex: reg
                    }
                },
                {
                    token: {
                        $regex: reg
                    }
                }
            ],
        }, {exchanges: {$slice: 30}, _id: 0, status: 0, deletedAt: 0, updatedAt: 0, createdAt: 0}, cb).limit(limit)
    } else {
        return await this.find({
            $or: [
                {
                    name: {
                        $regex: reg
                    }
                },
                {
                    nameCn: {
                        $regex: reg
                    }
                },
                {
                    token: {
                        $regex: reg
                    }
                }
            ]
        }, {exchanges: {$slice: 30}, _id: 0, status: 0, deletedAt: 0, updatedAt: 0, createdAt: 0}, cb)
    }
}
module.exports = mongoose.model('token', Schema)
