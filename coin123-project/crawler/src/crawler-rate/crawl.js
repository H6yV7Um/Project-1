const cheerio = require('cheerio')
const axios = require('axios')
const RateModel = require("./model")
/**
 * 爬取汇率数据
 */
exports.start = async() => {
  const url = 'https://huilv.911cha.com/'
  let html = await axios.get(url)
  let $ = cheerio.load(html.data)
  let rate = {}
  rate.usdcny = $(".panel:nth-child(2)").children(".mcon:nth-child(8)").children("table").children("tbody").children("tr:nth-child(2)").children('td:nth-child(3)').text()
  rate.hkdcny = $(".panel:nth-child(2)").children(".mcon:nth-child(8)").children("table").children("tbody").children("tr:nth-child(8)").children('td:nth-child(3)').text()
  rate.updateAt = Date.now()
  await RateModel.update({},rate,{upsert: true},(err)=>{
    if(err){
      console.log(err)
    }
  })
  console.log($(".panel:nth-child(2)").children(".mcon:nth-child(8)").children("table").children("tbody").children("tr:nth-child(2)").children('td:nth-child(3)').text())
  console.log($(".panel:nth-child(2)").children(".mcon:nth-child(8)").children("table").children("tbody").children("tr:nth-child(8)").children('td:nth-child(3)').text())
}