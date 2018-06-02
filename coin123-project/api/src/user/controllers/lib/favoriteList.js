const TokenPriceModel = require("../../../token/model/tokenPrice")
const StockModel = require("../../../token/model/stock")
/**
 * 返回资产列表数据
 * @param favoriteList
 */
exports.list = async(favoriteList) => {
    let _list = []
    for (let val of favoriteList) {
        if (val.type === "token") {
            let token = await TokenPriceModel.findOne({token: val.token}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            _list.push({
                _id: val._id,
                name: val.name,
                nameCn: val.nameCn,
                token: val.token,
                type: "token",
                price: token.price,
                '1dayProfitRate': token['1dayProfitRate'],
                // 币交易所名称
                storageName: val.storageName,
                // 币交易所中文名
                storageNameCn: val.storageNameCn
            })
        } else {
            let stock = await StockModel.findOne({token: val.token}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            console.log(val.token, stock)
            _list.push({
                _id: val._id,
                token: val.token,
                type: val.type,
                price: stock.price,
                '1dayProfitRate': stock['1dayProfitRate'],
                name: val.name,
                nameCn: val.nameCn
            })
        }
    }
    return _list
}