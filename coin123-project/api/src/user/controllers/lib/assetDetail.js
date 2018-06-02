const RateModel = require("../../../rate/model/rate")
const TokenPriceModel = require("../../../token/model/tokenPrice")
const StockModel = require("../../../token/model/stock")
/**
 * 获取资产详情数
 * @param asset
 * @return {{overView: {qty: number, token: string, totalAsset: number, 1dayProfitRate: number, totalProfitRate: number, totalPrice: number, totalProfit: number}, list: Array}}
 */
exports.detail = async(asset) => {
    let list = [], overView = {
        // 总个数
        qty: 0,
        token: "",
        // 总资产
        totalAsset: 0,
        // 今日收益率
        "1dayProfitRate": 0,
        // 总收益率
        totalProfitRate: 0,
        // 总成本
        totalPrice: 0,
        // 总收益
        totalProfit: 0,
    }
    for (let val of asset) {
        let data = await getAssetData(overView, val, list)
        list = data.list
        overView = data.overView
    }
    // 总收益率
    overView.totalProfitRate = (overView.totalAsset - overView.totalPrice) / overView.totalPrice
    return {overView, list}
}
/**
 * 获取资产数据
 * @param overView
 * @param val
 * @param list
 * @param rate 资产的汇率
 * @return {{list: *, overView: *}}
 */
const getAssetData = async(overView, val, list, rate = 1) => {
    let _asset = null, price = 0
    if (val.asset.type === 'token') {
        _asset = await TokenPriceModel.findOne({token: val.asset.token})
    } else {
        _asset = await StockModel.findOne({token: val.asset.token})
    }
    price = rd(_asset.price)
    list.push({
        storageName: val.asset.storageName,
        storageNameCn: val.asset.storageNameCn,
        qty: val.asset.qty,
        token: val.asset.token,
        // 当前总价格
        currentTotalPrice: price * val.asset.qty,
        // 当前单价
        price: price,
        // 买入价格
        unitPrice: val.asset.unitPrice,
        // 今日利润
        "1dayProfit": rdRate(_asset['1dayProfitRate']),
        // 总利润
        totalProfit: price * val.asset.qty - val.asset.totalPrice,
        // 买入时间
        butAt: val.asset.buyAt
    })
    // 总个数
    overView.qty += val.asset.qty
    // 代码
    overView.token = val.asset.token
    // 总资产
    overView.totalAsset += price * val.asset.qty
    // 总成本
    overView.totalPrice += val.asset.totalPrice
    // 总收益
    overView.totalProfit += overView.totalAsset - overView.totalPrice
    // 今日收益率
    overView["1dayProfitRate"] = _asset['1dayProfitRate']
    return {list, overView}
}
/**
 * 随机产生+ -号
 * @return {string}
 */
const sign = (arr) => {
    return arr[Math.floor(Math.random() * arr.length + 1) - 1]
}
/**
 * 随机产生价格2/10000 - 8/10000
 * @param price
 * @return {*}
 */
const rd = (price) => {
    let _price = price
    let symbol = sign(['-', '+'])
    let ratio = Math.floor(Math.random() * 7 + 2) / 10000
    if (symbol === "+") {
        _price = _price * (1 + ratio)
    } else if (symbol === "-") {
        _price = _price * (1 - ratio)
    }
    return _price
}
/**
 * 随机产生单日涨跌幅
 * @param rate
 * @return {string}
 */
const rdRate = (rate) => {
    let _rate = rate
    let r = sign([-1.2, -1.1, -1, 0, 1, 1.1, 1.2])
    return r + _rate
}
