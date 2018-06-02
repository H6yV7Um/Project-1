/**
 * @file 爬取非白皮书数据
 * @author wangle(wangle@nibirutech.com)
 */
const CrawlICoin = require('./action/crawlCoin/')
const TokenModel = require('./models/token')
const CmcTokenModel = require('./models/cmcToken')
const CrawltCoinExchangeInfo = require('./action/crawltCoinExchangeInfo')
exports.start = async() => {
  // 获取基础数据
  let baseData = CrawlICoin.getBasicData()
  // 获取币种交易所数据
  let coinExchangeRefData = CrawltCoinExchangeInfo.getCoinExchangeInfo()
  let tokens = createTokenExchangeRef(baseData, coinExchangeRefData)
  await formatData(tokens)
}
/**
 * 存储币种市场关系
 * @param token
 * @param coinExchangeRefData
 */
const createTokenExchangeRef = (tokens, coinExchangeRefData) => {
  let _token = []
  for (let token of tokens) {
    for (let val of coinExchangeRefData) {
      if (val.name.replace(/\s/g, "") === token.name) {
        for (let exchange of val.exchanges) {
          // 排名
          _token.push({
            ranking: token.ranking,
            // 币的英文名 eg: Bitcoin
            name: token.name,
            // 币的中文名
            nameCn: token.nameCn,
            // 代币简称
            token: token.token,
            exchangeName: exchange.name,
            exchangeNameCn: exchange.nameCn,
          })
        }
      }
    }
  }
  return _token
}

const formatData = async(token) => {
  let cmcToken = await CmcTokenModel.find({}, (err)=> {
    if (err) {
      console.log(err)
    }
  })
  for (let val of token) {
    for (let ct of cmcToken) {
      if (val.token && val.token.toLowerCase() === ct.token.toLowerCase()) {
        let data = {
          exchangeName: val.exchangeName,
          name: val.name,
          token: val.token,
          nameCn: val.nameCn,
          ranking: val.ranking,
          exchangeNameCn: val.exchangeNameCn,
          tokenId: ct.tokenId
        }
        await TokenModel.update({name: val.name, exchangeName: val.exchangeName}, data, {upsert: true}, (err) => {
          if (err) {
            console.log(err)
          }
        })
      }
    }
  }
}
