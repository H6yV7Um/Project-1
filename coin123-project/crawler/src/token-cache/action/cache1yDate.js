const CmcTokenModel = require("../models/cmcToken")
const CacheTokenModel = require("../models/cacheToken")
const axios = require('axios')
const async = require("async")
/**
 * 缓存币的历史价格数据
 */
exports.cache = async() => {
    let tasks = []
    let count = await CmcTokenModel.count({}), baseCount = 300
    let length = Math.ceil(count / baseCount)
    for (let i = 0; i < length; i++) {
        if (i > 0) {
            let cmcToken = await CmcTokenModel.find({}).sort({ranking: 1}).limit(300).limit(i * 300)
            tasks.push(cmcToken)
        } else {
            let cmcToken = await CmcTokenModel.find({}).sort({ranking: 1}).limit(300)
            tasks.push(cmcToken)
        }
    }
    async.parallel(tasks, (err, result)=> {
        if (err) {
            console.log(err)
        } else {
            console.log(result)
        }
    })
}

const startCache = async(cmcToken) => {
    for (let val of cmcToken) {
        let end = Date.now()
        let start = end - 3 * 31 * 24 * 60 * 60 * 1000
        let url = `https://graphs2.coinmarketcap.com/currencies/${val.slug}/${start}/${end}`
        console.log(url)
        let res = await getData(url)
        if (res) {
            let tokencache = {
                name: val.name,
                // 代码
                token: val.token,
                // 排名数据
                ranking: val.ranking,
                // 缓存数据
                cache: []
            }
            tokencache.cache = tokencache.cache.concat(res)
            for (let i = 1; i < 4; i++) {
                end = start
                start = end - 3 * 31 * 24 * 60 * 60 * 1000
                url = `https://graphs2.coinmarketcap.com/currencies/${val.slug}/${start}/${end}`
                res = await getData(url)
                tokencache.cache = tokencache.cache.concat(res)
            }
            await createData(tokencache)
        }
    }
}
/**
 * 请求获取历史数据
 * @param url
 * @param count
 * @return {*}
 */
const getData = async(url)=> {
    let res = await axios.get(url)
    return res.data.price_usd
}
/**
 * 存储数据
 * @param cache
 */
const createData = async(tokencache) => {
    try {
        await CacheTokenModel.update({name: tokencache.name}, {$set: tokencache}, {upsert: true}, (err)=> {
            if (err) {
                console.log(err)
            }
        })
    } catch (err) {
        console.log(err)
    }
}