const fs = require('fs')
const path = require('path')
const process = require('process')
/**
 * 读取文件，返回文件中文件内容的数组
 * @return {*}
 */
exports.readFolder = (filepath) => {
  //解析需要遍历的文件夹
  let filePath = path.resolve(filepath)
  // 根据文件路径同步读取读取文件，返回文件列表
  let files = fs.readdirSync(filePath)
  let fileContentArr = files.map( (filename) =>  {
    // 获取当前文件的绝对路径
    let filedir = path.join(filePath, filename)
    let fileContent = fs.readFileSync(filedir, "utf-8")
    return fileContent
  })
  return fileContentArr
}