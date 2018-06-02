const CmcTokenModel = require("../models/cmcToken")
const CacheTokenModel = require("../models/cacheToken")
const axios = require('axios')
/**
 * 缓存币的历史价格数据
 */
exports.cache = async() => {
    let retryCount = 10
    try {
        await startCache()
    } catch (err) {
        if (retryCount > 0) {
            await startCache()
            retryCount--
        }
    }
}