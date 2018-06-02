const mongoose = require('mongoose')
mongoose.plugin(require('../../../mongoosePlugin/commonFiled'))
const Schema = new mongoose.Schema({
    // 设备id
    deviceId: {
        type: String,
        required: true
    },
    // 个人资产
    asset: [{
        // 资产名称 bitcoin、美股、港股、A股
        name: {
            type: String,
            required: true
        },
        // 资产类型
        type: {
            type: String,
            required: true,
            // "HK" -> 美股、'HK' ->港股、"A" -> A股、 token -> 币
            enum: ['A', 'US', 'HK', 'token']
        },
        // 代码
        token: {
            type: String,
        },
        // 如果是币种，存放币在coinmarketcap里面的id
        tokenId: {
            type: String
        },
        // 交易所名称
        storageName: {
            type: String
        },
        // 交易所中文名称
        storageNameCn: {
            type: String
        },
        // 数量
        qty: {
            type: Number,
            required: true
        },
        // 单价
        unitPrice: {
            type: Number,
            required: true
        },
        // 总价
        totalPrice: {
            type: Number,
            required: true
        },
        // 价格类型，单价／总价
        priceType: {
            type: Number,
            required: true,
            // 1 -> 单价 2 -> 总价
            enum: [1, 2]
        },
        // 买入时间时间戳
        buyAt: Number,
        // 备注
        remark: String
    }],
    // 个人收藏列表
    favorite: [{
        // 资产名称
        name: {
            type: String,
            required: true
        },
        // 资产中文名
        nameCn: {
            type: String,
            required: true
        },
        // 币交易所名称
        storageName: {
            type: String,
        },
        // 币交易所中文名
        storageNameCn: {
            type: String
        },
        // 资产类型
        type: {
            type: String,
            required: true,
            // US -> 美股、HK ->港股、A -> A股、 token -> 币
            enum: ['A', 'US', 'HK', 'token']
        },
        // 代码
        token: {
            type: String,
            required: true
        },
    }]
})
module.exports = mongoose.model('user', Schema)