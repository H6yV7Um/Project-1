const cheerio = require('cheerio')
const fs = require('fs')
const {formatCurrencyDetail} = require("../../format/formatRealTimeInfo")
/**
 * 遍历币种详情链接数组，分别爬取每种币种的详情
 * 获取相应数据并返回币种的详情数据
 * @param urls
 * @return {Array}
 */
exports.getCurrencyDetails = (fileContent, name) => {
  let $ = cheerio.load(fileContent)
  let currencyDetail = {}
  // 排名
  currencyDetail.ranking = $("#baseInfo .firstPart").children("div:nth-child(2)").children(".value").children(".tag-marketcap").text()
  // 英文名 eg: Bitcoin
  currencyDetail.name = $("#baseInfo .secondPark ul").children("li:nth-child(1)").children(".value").text().split('/')[0].replace(/[\r\n]/g)
  // 中文名
  currencyDetail.nameCn = $("#baseInfo .secondPark ul").children("li:nth-child(2)").children(".value").text()
  // 简称
  currencyDetail.token = $("#baseInfo .secondPark ul").children("li:nth-child(1)").children(".value").text().split('/')[1]
  return formatCurrencyDetail(currencyDetail)
}