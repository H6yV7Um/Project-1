let request = require('async-request')
exports.get = async(url) => {
  let response = await request(url)
  return response.body
}
exports.post = async(url, headers = {}, data = {}) => {
  try {
    let response = await request(url, {
      method: method,
      data: data,
      headers: headers
    })
    return response
  } catch (e) {
    console.log(e)
  }
}