/**
 * @file 资产模块，模块编号10，
 * @author wangle(wangle@nibirutech.com)
 */
const response = require("../../../utils/response")
const code = require("../code")
const UserModel = require("../model/user")
const Group = require("./lib/group")
const List = require("./lib/list")
const TotalAsset = require("./lib/totalAsset")
const Integrate = require("./lib/integrate")
const TokenModel = require("../../token/model/token")
const AssetDetail = require("./lib/assetDetail")
const GetTokenHistoricalData = require("./lib/getTokenHistoricalData")
/**
 * 添加资产接口，接口编号001
 * @param ctx
 */
exports.add = async (ctx) => {
    let {
        // 名字
        name,
        // 类型 US -> 美股、HK ->港股、A -> A股、 token -> 币
        type,
        // 代码
        token,
        tokenId,
        // 数量
        qty,
        // 价格
        price,
        // 价格类型
        priceType,
        // 买入时间
        buyAt,
        // 备注
        remark,
        // 交易所名称
        storageName
    } = ctx.request.body
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    if (!deviceId || !name || !type || !token || !qty || !price || !priceType || !buyAt) {
        return response.error(ctx, code.ADD_ASSET[ 0 ][ 0 ], code.ADD_ASSET[ 0 ][ 1 ])
    }
    let asset = {
        name,
        type,
        token,
        qty : +qty,
        priceType : +priceType,
        buyAt : +buyAt
    }
    if (asset.priceType === 2) { // 如果是总价
        // 单价
        asset.unitPrice = (+price) / (+qty)
        // 总价
        asset.totalPrice = +price
    } else {
        // 单价
        asset.unitPrice = +price
        // 总价
        asset.totalPrice = (+price) * (+qty)
    }
    // 存放币在coinmarketcap里面的id
    if (tokenId) {
        asset.tokenId = tokenId
    }
    // 备注
    if (remark) {
        asset.remark = remark
    }
    // 交易所名称
    if (storageName) {
        let _token = await TokenModel.findOne({token, exchangeName : storageName.toLowerCase()})
        console.log(_token)
        asset.storageNameCn = _token.exchangeNameCn
        asset.storageName = storageName
    }
    asset.createdAt = Date.now()
    try {
        // 添加资产
        await UserModel.update({deviceId : deviceId}, {
            $push : {
                "asset" : asset
            }
        }, {upsert : true}, (err)=> {
            if (err) {
                console.log(err)
            }
        })
        return response.success(ctx)
    } catch (err) {
        return response.error(ctx, code.ADD_ASSET[ 1 ][ 0 ], code.ADD_ASSET[ 1 ][ 1 ])
    }
}
/**
 * 获取用户资产列表,接口编号004
 * @param ctx
 */
exports.list = async (ctx) => {
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    if (!deviceId) {
        return response.error(ctx, code.GET_ASSET[ 0 ][ 0 ], code.GET_ASSET[ 0 ][ 1 ])
    } else {
        try {
            let asset = await UserModel.findOne({deviceId}, {asset : 1}, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            // 按token对资产进行分组
            let newAsset = Group.group(asset.asset)
            // 获取资产列表
            let list = await List.list(newAsset, deviceId)
            // 获取总资产数据
            let totalAsset = await TotalAsset.getTotalAsset(asset.asset)
            let res = Integrate.integrate(totalAsset, list)
            return response.success(ctx, res)
        } catch (err) {
            return response.error(ctx, code.GET_ASSET[ 1 ][ 0 ], code.GET_ASSET[ 1 ][ 1 ])
        }
        
    }
}
/**
 * 删除某一条用户资产,接口编号008
 * @param ctx
 */
exports.delOne = async (ctx) => {
    let _id = ctx.request.body._id
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    if (!deviceId || !_id) {
        return response.error(ctx, code.DELETE_ASSET[ 0 ][ 0 ], code.DELETE_ASSET[ 0 ][ 1 ])
    } else {
        try {
            await UserModel.update({deviceId}, {
                $pull : {
                    "asset" : {
                        _id
                    }
                }
            }, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.DELETE_ASSET[ 1 ][ 0 ], code.DELETE_ASSET[ 1 ][ 1 ])
        }
    }
}
/**
 * 删除同类型资产接口,接口编号009
 * @param ctx
 */
exports.del = async (ctx) => {
    let token = ctx.request.body.token
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    if (!deviceId || !token) {
        return response.error(ctx, code.DELETE_ASSETS[ 0 ][ 0 ], code.DELETE_ASSETS[ 0 ][ 1 ])
    } else {
        try {
            console.log(token)
            await UserModel.update({deviceId}, {
                $pull : {
                    "asset" : {
                        token
                    }
                }
            }, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.DELETE_ASSETS[ 1 ][ 0 ], code.DELETE_ASSETS[ 1 ][ 1 ])
        }
    }
}
/**
 * 用户资产编辑接口,接口编号 007
 * @param ctx
 */
exports.edit = async (ctx) => {
    let {
        // 资产在数据库中的id
        _id,
        // 数量
        qty,
        // 价格
        price,
        // 价格类型
        priceType,
        // 买入时间
        buyAt,
        // 备注
        remark
    } = ctx.request.body
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = 11111
    }
    if (!deviceId || !_id || !qty || !price || priceType || !buyAt) {
        return response.error(ctx, code.EDIT_ASSET[ 0 ][ 0 ], code.EDIT_ASSET[ 0 ][ 1 ])
    } else {
        let set = {}
        set[ 'asset.$.qty' ] = +qty
        if (priceType === 2) { // 如果是总价
            // 单价
            set[ 'asset.$.unitPrice' ] = (+price) / (+qty)
            // 总价
            set[ 'asset.$.totalPrice' ] = +price
        } else {
            // 单价
            set[ 'asset.$.unitPrice' ] = +price
            // 总价
            set[ 'asset.$.totalPrice' ] = (+price) * (+qty)
        }
        set[ 'asset.$.buyAt' ] = +buyAt
        if (remark) {
            set[ 'asset.$.remark' ] = remark
        }
        try {
            await UserModel.update({deviceId, asset : {$elemMatch : {_id}}}, {
                $set : set
            }, (err)=> {
                if (err) {
                    console.log(err)
                }
            })
            return response.success(ctx)
        } catch (err) {
            return response.error(ctx, code.EDIT_ASSET[ 1 ][ 0 ], code.EDIT_ASSET[ 1 ][ 1 ])
        }
    }
}
/**
 * 获取资产详情列表,接口编号010
 * @param ctx
 */
exports.detail = async (ctx) => {
    let token = ctx.request.query.token
    let deviceId = ctx.headers.deviceid
    if (!deviceId) {
        deviceId = '11111'
    }
    if (!token || !deviceId) {
        return response.error(ctx, code.ASSET_DETAIL_LIST[ 0 ][ 0 ], code.ASSET_DETAIL_LIST[ 0 ][ 1 ])
    } else {
        try {
            let asset = await UserModel.aggregate({$match : {deviceId}},
                {
                    $project : {
                        asset : 1,
                        _id : 0
                    }
                },
                {$unwind : "$asset"},
                {$match : {"asset.token" : token}}
            )
            let res = await AssetDetail.detail(asset)
            return response.success(ctx, res)
        } catch (err) {
            return response.error(ctx, code.ASSET_DETAIL_LIST[ 1 ][ 0 ], code.ASSET_DETAIL_LIST[ 1 ][ 1 ])
        }
    }
}
/**
 * 获取资产历史数据接口
 * @param ctx
 */
exports.statistics = async (ctx)=> {
    try {
        let {range} = ctx.request.query
        let deviceId = ctx.headers.deviceid
        if (!deviceId) {
            deviceId = '11111'
        }
        let asset = await UserModel.findOne({deviceId}, {asset : 1})
        if (asset.asset && asset.asset.length) {
            let data = await GetTokenHistoricalData.getRatio(range, "eos")
            return response.success(ctx, data)
        } else {
            
        }
    } catch (err) {
        console.log(err)
    }
    
}
