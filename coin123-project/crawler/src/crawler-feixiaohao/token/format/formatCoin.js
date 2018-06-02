/**
 * 格式化爬取到的currencyDetail，包括数据整理，转换类型等等
 * 对数据进行整理过滤
 * @param currencyDetail 未经格式化的currencyDetail
 * @return {{}}
 */
exports.formatCurrencyDetail = async (currencyDetail, isIco) => {
  currencyDetail.ranking = Number(currencyDetail.ranking.substring(1, currencyDetail.ranking.length - 1))
  if (currencyDetail.nameCn === '－') {
    currencyDetail.nameCn = ''
  }
  currencyDetail.supplyCirculating = Number(currencyDetail.supplyCirculating.split(' ')[ 0 ].split(',').join(''))
  currencyDetail.supplyTotal = Number(currencyDetail.supplyTotal.split(' ')[ 0 ].split(',').join(''))
  // 判断是否有ico数据
  if (!!isIco) {
    currencyDetail.tokenPercentageForInvestors = Number(currencyDetail.tokenPercentageForInvestors)
    currencyDetail.totalTokensSupply = Number(currencyDetail.totalTokensSupply)
    currencyDetail.startAt = (new Date(currencyDetail.startAt)) / 1000
    currencyDetail.endAt = (new Date(currencyDetail.endAt)) / 1000
    // 如何计算？？
    currencyDetail.icoPrice = ''
    if (currencyDetail.icoAvgPrice) {
      currencyDetail.icoAvgPrice = Number(currencyDetail.icoAvgPrice.split('¥')[ 1 ].split('）')[ 0 ])
    }
  }
  // console.log(currencyDetail)
  return currencyDetail
}