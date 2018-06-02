/**
 * @file 汇率模块模块编号30
 * @author wangle(wangle@nibirutech.com)
 */
const response = require("../../../utils/response")
const RateModel = require("../model/rate")
/**
 * 币搜索接口,接口编号003
 * @param ctx
 */
exports.rate = async(ctx) => {
  let res = await RateModel.findOne({},{createdAt:0,updatedAt:0,deletedAt:0,_id:0}, (err) => {
    if (err) {
      console.log(err)
    }
  })
  return response.success(ctx, res)
}