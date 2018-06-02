/**
 * 格式化爬取到的currencyDetail，包括数据整理，转换类型等等
 * 对数据进行整理过滤
 * @param currencyDetail 未经格式化的currencyDetail
 * @return {{}}
 */
exports.formatCurrencyDetail = (currencyDetail) => {
  let currrentCurrencyDetail = {}
  let {
    ranking,
    name,
    nameCn,
    token,
    icon
  } = {...currencyDetail}
  currrentCurrencyDetail.ranking = Number(ranking.replace(/[\r\n]/g, "").substring(1, ranking.length - 1))
  currrentCurrencyDetail.name = name.replace(/[\r\n]/g, "")
  if (nameCn) {
    currrentCurrencyDetail.nameCn = nameCn.replace(/[\r\n]/g, "")
  }
  if (token) {
    currrentCurrencyDetail.token = token.replace(/[\r\n]/g, "")
  }
  if (icon) {
    currrentCurrencyDetail.icon = icon.replace(/[\r\n]/g, "")
  }
  return currrentCurrencyDetail
}

/**
 * 格式化爬取到的coinExchangeInfo包括数据整理，转换类型等等
 * @param coinExchangeInfo
 * @return {*}
 */
exports.formatCoinExchangeInfo = (exchange) => {
  let {
    // 排名
    ranking,
    // 交易所英文名
    name,
    // 交易所中文名
    nameCn

  } = {...exchange}
  let newExchange = {}
  newExchange.ranking = +ranking
  newExchange.name = name.replace(/[\r\n]/g, "")
  newExchange.nameCn = nameCn
  return newExchange
}