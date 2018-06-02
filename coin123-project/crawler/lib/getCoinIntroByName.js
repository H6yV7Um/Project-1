const path = require('path')
const process = require('process')
const FileDisplay = require('./fileDisplay')
/**
 * 根据币名返回简介页面的路径
 * @return {*}
 */
exports.getCoinIntroByName = (name, newpath) => {
  let paths = FileDisplay.fileDisplay(path.resolve(`./${newpath}`))
  let _path = ''
  for (let path of paths) {
    if (path.name === name) {
      _path = path.filedir
      break
    }
  }
  return _path
}