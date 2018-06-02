/**
 * @file 自选模块，模块编号20，
 * @author wangle(wangle@nibirutech.com)
 */
const code = require("../code")
const UserModel = require("../model/user")
const response = require("../../../utils/response")
const FavoriteList = require("./lib/favoriteList")
/**
 * 添加自选,接口编号001
 * @param ctx
 */
exports.add = async(ctx) => {
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    let {
        // 资产名称
        name,
        // 资产中文名
        nameCn,
        // 币交易所名称
        storageName,
        // 币交易所中文名
        storageNameCn,
        // 资产类型
        type,
        // 代码
        token
    } = ctx.request.body
    if (!name || !type || !token) {
        return response.error(ctx, code.ADD_FAVORITE[0][0], code.ADD_FAVORITE[0][1])
    } else {
        let favorite = {
            name,
            token,
            type
        }
        if (nameCn) {
            favorite.nameCn = nameCn
        }
        if (storageName) {
            favorite.storageName = storageName
        }
        if (storageNameCn) {
            favorite.storageNameCn = storageNameCn
        }
        try {
            await UserModel.update({deviceId}, {
                $addToSet: {
                    "favorite": favorite
                }
            }, {upsert: true}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.ADD_FAVORITE[1][0], code.ADD_FAVORITE[1][1])
        }
    }
}
/**
 * 自选列表,接口编号002
 * @param ctx
 */
exports.list = async(ctx) => {
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    try {
        let data = await UserModel.findOne({deviceId}, {favorite: 1}, (err)=> {
            if (err) {
                console.log(err)
            }
        })
        let res = await FavoriteList.list(data.favorite)
        return response.success(ctx, res)
    } catch (err) {
        return response.error(ctx, code.FAVORITE_LIST[0][0], code.FAVORITE_LIST[0][1])
    }
}
/**
 * 删除单条自选,接口编号003
 * @param ctx
 */
exports.delOne = async(ctx) => {
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    let _id = ctx.request.body._id
    if (!_id) {
        return response.error(ctx, code.DELETE_FAVORITE[0][0], code.DELETE_FAVORITE[0][1])
    } else {
        try {
            await UserModel.update({deviceId}, {
                $pull: {favorite: {_id}}
            }, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.DELETE_FAVORITE[1][0], code.DELETE_FAVORITE[1][1])
        }
    }
}
/**
 * 删除同类型自选,接口编号004
 * @param ctx
 */
exports.del = async(ctx) => {
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    let type = ctx.request.body.type
    if (!type) {
        return response.error(ctx, code.DELETE_FAVORITES[0][0], code.DELETE_FAVORITES[0][1])
    } else {
        try {
            await UserModel.update({deviceId}, {
                $pull: {favorite: {type}}
            }, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.DELETE_FAVORITES[1][0], code.DELETE_FAVORITES[1][1])
        }
    }
}