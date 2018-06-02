const fs = require('fs')
const path = require('path')
const crawl = require('./crawl')
/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
const fileDisplay = (filePath, paths = [], urlnames = []) => {
  let files = fs.readdirSync(path.resolve(`./${filePath}`))  // 根据文件路径读取文件，返回文件列表
  files.forEach(function (filename) {                 // 遍历读取到的文件列表
    let filedir = path.join(filePath, filename),      // 获取当前文件的绝对路径
      stats = fs.statSync(filedir),                   // 根据文件路径获取文件信息，返回一个fs.Stats对象
      isFile = stats.isFile(),                        // 是文件
      isDir = stats.isDirectory()                     // 是文件夹
    if (isFile) {
      urlnames.push(filedir.split('/')[filedir.split('/').length - 1].split('.')[0])
      paths.push(filedir)
    }
    if (isDir) {
      fileDisplay(filedir, paths, urlnames)                      // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
  return {paths, urlnames}
}

/**
 * 返回币种基本数据，只需爬取一次
 * @param fileContentArr
 */
exports.getBasicData = () => {
  let {paths, urlnames} = fileDisplay('data/20180319-16:34:59/details')
  fs.writeFileSync(path.resolve('./data/urlname.json'), JSON.stringify(urlnames))
  // 获取详情页数据
  let data = paths.map((path)=> {
    let fileContent = fs.readFileSync(path)
    let coinName = path.split('/')[path.split('/').length - 1].split('.')[0]
    return crawl.getCurrencyDetails(fileContent, coinName)
  })
  return data
}