const cheerio = require('cheerio')
const path = require('path')
const fs = require('fs')
const {
  formatCoinExchangeInfo
} = require("../../format/formatRealTimeInfo")

/**
 * 获取币种市场行情
 * @param url
 * @return {*}
 */
exports.getCoinExchangeInfo =  (fileContent) => {
  let $ = cheerio.load(fs.readFileSync(fileContent))
  let exchanges = []
  $("#markets tbody tr").each((i, item)=> {
    let exchange = {
      // 交易所英文名
      name: $(item).children("td:nth-child(2)").children("a").attr("href").replace(/\s/g, "").split('/')[2],
      // 交易所中文名
      nameCn: $(item).children("td:nth-child(2)").children("a").text().replace(/\s/g, "").split('-')[0],
    }
    exchanges.push(exchange)
  })
  return {
    name: $(".backbox").children("h2").text().replace(/(^\s*)|(\s*$)/g,'').split("\n")[0].replace(/[\r\n]/g, ""),
    exchanges
  }
}


