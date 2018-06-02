const response = require("../../../utils/response")
const request = require("../../../utils/request")
const code = require("../code")
const ExchangeModel = require("../model/exchange")
/**
 * 关键字搜索
 * @param ctx
 */
exports.list = async(ctx) => {
  let {keyword} = ctx.request.query
  let url = `https://api.feixiaohao.com/search/relatedword?q=${keyword}&limit=12`
  if (!keyword) {
    return response.error(ctx, code.EXCHANGE[0][0], code.EXCHANGE[0][1])
  } else {
    let res = JSON.parse((await request.get(url)))
    let data = []
    for (let r of res) {
      if (r[0] === '1') {
        let item = r.split('#')
        data.push({
          name: item[1],
          nameCn: item[2],
          icon: 'https:' + item[3]
        })
      }
    }
    return response.success(ctx, data)
  }
}




