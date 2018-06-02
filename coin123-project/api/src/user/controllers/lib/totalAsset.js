const RateModel = require("../../../rate/model/rate")
const TokenPriceModel = require("../../../token/model/tokenPrice")
const StockModel = require("../../../token/model/stock")
/**
 * 获取总资产数据
 * @param asset
 */
exports.getTotalAsset = async(asset) => {
    console.log(asset)
    let rate = await RateModel.findOne({}, (err)=> {
        if (err) {
            console.log(err)
        }
    })
    let totalAsset = {
        // 总资产
        totalAsset: 0,
        // 总收益率
        totalProfitRate: 0,
        // 今日收益率
        "1dayProfitRate": 0,
        // 总成本
        totalPrice: 0,
        // 总收益
        totalProfit: 0
    }
    for (let val of asset) {
        if (val.type === 'token') {      // 币
            totalAsset.totalPrice += val.totalPrice
            let token = await TokenPriceModel.findOne({token: val.token})
            totalAsset.totalAsset += token.price * val.qty
        } else {
            let stock = await StockModel.findOne({token: val.token})
            totalAsset.totalAsset += stock.price * val.qty
            if (val.type === 'US') {          // 美股
                totalAsset.totalPrice += val.totalPrice * rate.usdcny
            } else if (val.type === 'HK') {   // 港股
                totalAsset.totalPrice += val.totalPrice * rate.hkdcny
            } else if (val.type === 'A') {    // a股
                totalAsset.totalPrice += val.totalPrice
            }
        }
    }
    totalAsset.totalProfit = totalAsset.totalAsset - totalAsset.totalPrice
    totalAsset.totalProfitRate = totalAsset.totalProfit / totalAsset.totalAsset * 100
    return totalAsset
}