const request = require("../../../../utils/request")
const response = require("../../../../utils/response")

/**
 * 获取币各个时间段的历史数据
 * @param range
 */
const get = async(range, name) => {
    try {
        let url = `https://graphs2.coinmarketcap.com/currencies/${name}/`
        let _url = ''
        if (range === "1d") {          // 过去一天
            let end = Date.now()
            let start = end - 24 * 60 * 60 * 1000
            _url = url + `/${start}/${end}/`
        } else if (range === "7d") {   // 过去一周
            let end = Date.now()
            let start = end - 7 * 24 * 60 * 60 * 1000
            _url = url + `/${start}/${end}/`
        } else if (range === "1m") {   // 过去一个月
            let end = Date.now()
            let start = end - 30 * 24 * 60 * 60 * 1000
            _url = url + `/${start}/${end}/`
        } else if (range === "1y") {   // 过去一年
            let end = Date.now()
            let start = end - 365 * 24 * 60 * 60 * 1000
            _url = url + `/${start}/${end}/`
        }
        let data = await request.get(_url)
        if (data) {
            let priceUsd = JSON.parse(data).price_usd
            console.log('get')
            return format(priceUsd, range, asset)
        } else {
            return 0
        }
    } catch (err) {
        
    }
}
/**
 * 返回时间段内的数据
 * @param priceUsd
 * @param range
 */
const format = (priceUsd, range, asset) => {
    let _data = ''
    if (range === "1d") {          // 过去一天,取24个点
        _data = getData(24, priceUsd)
    } else if (range === "7d") {   // 过去一周，取21个点
        _data = getData(21, priceUsd)
    } else if (range === "1m") {   // 过去一个月，取30个点
        _data = getData(30, priceUsd)
    } else if (range === "1y") {   // 过去一年， 取24个点
        _data = getData(24, priceUsd)
    }
    return _data
}
/**
 * 获取数据返回
 * @param count
 * @param priceUsd
 * @return {Array}
 */
const getData = (count, priceUsd) => {
    let data = []
    let length = priceUsd.length
    let mod = length % count
    for (let i = 0; i < count; i++) {
        if (i === count - 1) {
            if (mod === 0) {
                data.push(priceUsd[i + count])
            } else {
                data.push(priceUsd[length - 1])
            }
        } else {
            data.push(priceUsd[i + count])
        }
    }
    return data
}
/**
 * 获取收益比率
 * @param asset
 */
exports.getRatio = (asset) => {
    for (let val of asset) {
        
    }
}