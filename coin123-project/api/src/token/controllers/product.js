/**
 * @file 资产模块，模块编号10，
 * @author wangle(wangle@nibirutech.com)
 */
const response = require("../../../utils/response")
const request = require("../../../utils/request")
const code = require("../code")
const TokenModel = require("../model/token")
/**
 * 币搜索接口,接口编号003
 * @param ctx
 */
exports.tokenList = async(ctx) => {
    try {
        let token = await TokenModel.find({}, {status: 0, deletedAt: 0, updatedAt: 0, createdAt: 0, _id: 0}, (err)=> {
            if (err) {
                console.log(err)
            }
        }).sort({ranking: 1})
        return response.success(ctx, token)
    } catch (err) {
        return response.error(ctx, code.TOKEN[0][0], code.TOKEN[0][1])
    }
}
/**
 * 股票搜索接口，接口编号002
 * @param ctx
 */
exports.stockList = async(ctx) => {
    let keyword = ctx.request.query.keyword
    if (!keyword) {
        return response.error(ctx, code.STOCK[0][0], code.STOCK[0][1])
    } else {
        try {
            let url = `https://api.hox.com/v1/ticket/search?keyword=${keyword}`
            let data = JSON.parse(await request.get(url)).data
            let res = []
            if (!data) {
                return response.success(ctx, [])
            } else {
                let _res = {
                    name: data.name,
                    nameCn: data.nameCn,
                    token: data.code,
                    type: data.ex,
                }
                res.push(_res)
                return response.success(ctx, res)
            }
        } catch (err) {
            return response.error(ctx, code.STOCK[1][0], code.STOCK[1][1])
        }
    }
}