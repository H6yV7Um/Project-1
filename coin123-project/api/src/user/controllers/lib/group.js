/**
 *  按数组的某个属性进行分组
 * @param arr
 */
exports.group = (arr) => {
  return arr.reduce((pre, current, index) => {
    pre[current.token] = pre[current.token] || []
    pre[current.token].push(current)
    return pre
  }, {})
}