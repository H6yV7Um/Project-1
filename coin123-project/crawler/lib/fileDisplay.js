const fs = require('fs')
const path = require('path')
/**
 * 遍历文件
 * @param filePath
 * @param paths
 * @return {Array}
 */
exports.fileDisplay = (filePath, paths = []) => {
  return getPaths(filePath, paths = [])
}
const getPaths = (filePath, paths = []) => {
  let files = fs.readdirSync(filePath)
  // 根据文件路径读取文件，返回文件列表
  files.forEach((filename) => {                              // 遍历读取到的文件列表
    let filedir = path.join(filePath, filename),             // 获取当前文件的绝对路径
      stats = fs.statSync(filedir),                          // 根据文件路径获取文件信息，返回一个fs.Stats对象
      isFile = stats.isFile(),                               // 是文件
      isDir = stats.isDirectory()                            // 是文件夹
    if (isFile) {
      paths.push({
        name: filedir.split('/')[filedir.split('/').length - 1].split('.')[0],
        filedir
      })
    }
    if (isDir) {
      getPaths(filedir, paths)                                // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
    }
  })
  return paths
}
