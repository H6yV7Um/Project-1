const read = require("../../../../../lib/readFolder")
const _ = require('./crawl')
const path = require('path')
const fs = require('fs')

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
const fileDisplay = (filePath, paths = []) => {
  let files = fs.readdirSync(path.resolve(`./${filePath}`))  // 根据文件路径读取文件，返回文件列表
  files.forEach(function (filename) {                 // 遍历读取到的文件列表
    let filedir = path.join(filePath, filename),      // 获取当前文件的绝对路径
      stats = fs.statSync(filedir),                   // 根据文件路径获取文件信息，返回一个fs.Stats对象
      isFile = stats.isFile(),                        // 是文件
      isDir = stats.isDirectory()                     // 是文件夹
    if (isFile) {
      paths.push(filedir)
    }
    if (isDir) {
      fileDisplay(filedir, paths)                      // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
  return paths
}
// 获取币种全网的实时价格
exports.getWholeNetworkCoinInfo = () => {
  // 调用文件夹遍历方法
  let fileContentArr = read.readFolder(path.resolve('./data/20180319-16:34:59/currencies'))
  return _.getWholeNetworkCoinInfo(fileContentArr)
}
// 获取币种交易所数据
exports.getCoinExchangeInfo = () => {
  // 调用文件夹遍历方法
  let fileContentArr = fileDisplay('./data/20180319-16:34:59/coinmarket')
  let urlnames = JSON.parse((fs.readFileSync(path.join(path.resolve('./data'), 'urlname.json'))).toString())
  let data = []
  for (let urlname of urlnames) {
    let page = 1, newExchanges = [], newUnit = [], newName = ''
    while (true) {
      let fileContent = getFilecontentUrl(fileContentArr, `${urlname}-p${page}`)
      if (fileContent) {
        let {exchanges,name} = _.getCoinExchangeInfo(fileContent)
        newExchanges = newExchanges.concat(exchanges)
        newName = name
      } else {
        break
      }
      page++
    }
    if (newExchanges.length) {
      data.push({
        name: newName,
        exchanges: newExchanges
      })
    }
  }
  return data
}
/**
 * 返回当前页面的路径
 * @param fileContentArr
 * @param urlname
 * @return {*}
 */
const getFilecontentUrl = (fileContentArr, urlname) => {
  for (let fileContent of fileContentArr) {
    if (urlname === fileContent.split('/')[fileContent.split('/').length - 1].split('.')[0]) {
      return fileContent
    }
  }
  return ''
}

