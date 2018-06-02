const request = require("../../../../utils/request")
const TokenPriceModel = require("../../../token/model/tokenPrice")
const StockModel = require("../../../token/model/stock")
/**
 * 返回资产列表数据
 * @param newAsset
 */
exports.list = async(newAsset, deviceId) => {
    let list = []
    for (let key of Object.keys(newAsset)) {
        let qty = 0, totalPrice = 0, type = '', tokenId = '', updatedAt = 0, name = ''
        for (let val of newAsset[`${key}`]) {
            if (val.type === 'token') {
                tokenId = val.tokenId
            }
            type = val.type
            qty += val.qty
            totalPrice += val.totalPrice
            name = val.name
        }
        if (type === 'token') {
            let tokenPrice = await TokenPriceModel.findOne({token: key}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            if (tokenPrice) {
                if ((Date.now() / 1000 / 60) - tokenPrice.updatedAt / 1000 / 60 > 5) {
                    let data = getTokenData(tokenId, key, qty)
                    if (data) {
                        list.push(data)
                    }
                } else {
                    list.push({
                        type: "token",
                        token: key,
                        icon: tokenPrice.icon,
                        qty: qty,
                        price: tokenPrice.price,
                        '1dayProfitRate': tokenPrice['1dayProfitRate'],
                        totalPrice: totalPrice,
                        totalProfit: tokenPrice.price * qty - totalPrice,
                    })
                }
            } else {
                let data = getTokenData(tokenId, key, qty)
                if (data) {
                    list.push(data)
                }
                list.push(data)
            }
        } else {
            let stock = await StockModel.findOne({token: key}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            if (stock) {
                if ((Date.now() / 1000 / 60) - stock.updatedAt / 1000 / 60 > 5) {
                    let data = await getStockData(name, qty, totalPrice)
                    if (data) {
                        list.push(data)
                    }
                    list.push(data)
                } else {
                    list.push({
                        type: stock.type,
                        token: stock.token,
                        qty: qty,
                        price: stock.price,
                        '1dayProfitRate': stock['1dayProfitRate'],
                        totalPrice: totalPrice,
                        totalProfit: stock.price * qty - totalPrice,
                    })
                }
            } else {
                let data = await getStockData(name, qty, totalPrice)
                if (data) {
                    list.push(data)
                }
                list.push(data)
            }
        }
    }
    return list
}

/**
 * 获取币的实时数据
 * @param tokenId
 * @param key
 * @param qty
 * @return {{type: string, token: *, icon: string, qty: *, price: *, 1dayProfitRate: *, totalPrice: *, totalProfit: number}}
 */
const getTokenData = async(tokenId, key, qty, totalPrice) => {
    let url = `https://widgets.coinmarketcap.com/v2/ticker/${tokenId}/?ref=widget&convert=CNY`
    let res = await request.get(url)
    let token = JSON.parse(res).data
    if (token) {
        let data = {
            type: "token",
            token: key,
            icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.rank}.png`,
            qty: qty,
            price: token.price_cny,
            '1dayProfitRate': token.percent_change_24h,
            totalPrice: totalPrice,
            totalProfit: token.price_cny * qty - totalPrice,
        }
        
        // 更新数据
        await TokenPriceModel.update({token: key}, {
            $set: {
                token: key,
                icon: `https://s2.coinmarketcap.com/static/img/coins/64x64/${token.rank}.png`,
                price: token.price_cny,
                '1dayProfitRate': token.percent_change_24h,
                updatedAt: Date.now()
            }
        }, {upsert: true}, (err)=> {
            if (err) {
                console.log(err)
            }
        })
        return data
    } else {
        return 0
    }
    
}
/**
 *  返回股票的实时价格数据
 * @param name
 * @param qty
 * @param totalPrice
 * @return {{type: *, token: *, qty: *, price: (tagmanager.accounts.containers.versions.live|((params:any, options:any, callback:any)=>void)), 1dayProfitRate: (((b:MomentInput, unitOfTime?:unitOfTime.Diff, precise?:boolean)=>number)|*|diff), totalPrice: *, totalProfit: number}}
 */
const getStockData = async(name, qty, totalPrice) => {
    let url = `https://api.hox.com/v1/ticket/search?keyword=${name}`
    let res = await request.get(url)
    let stock = JSON.parse(res).data
    if (stock) {
        let data = {
            type: stock.ex,
            token: stock.code,
            qty: qty,
            price: stock.live,
            '1dayProfitRate': stock.diff,
            totalPrice: totalPrice,
            totalProfit: stock.live * qty - totalPrice,
        }
        // 更新数据
        await StockModel.update({token: stock.code}, {
            $set: {
                type: stock.ex,
                token: stock.code,
                price: stock.live,
                '1dayProfitRate': stock.diff,
                updatedAt: Date.now()
            }
        }, {upsert: true}, (err) => {
            if (err) {
                console.log(err)
            }
        })
        return data
    } else {
        return 0
    }
}
