/**
 * 整合总资产数据和资产列表数据
 * @param totalAsset
 * @param list
 * @return {{totalAsset: *, list: *}}
 */
exports.integrate = (totalAsset, list) => {
    // 总资产
    let _totalAsset = totalAsset.totalAsset
    // 一日之前的总资产
    let preTotal = 0
    // 当前的总资产
    let currentTotal = totalAsset.totalAsset
    for (let val of list) {
        val.ratio = (val.totalPrice + val.totalProfit) / _totalAsset
        let a = (100 + val["1dayProfitRate"]) / 100
        preTotal += (val.price / a) * val.qty
    }
    totalAsset["1dayProfitRate"] = (currentTotal - preTotal) / preTotal * 100
    return {
        totalAsset,
        list
    }
}