const axios = require("axios")
exports.get = async () => {
  const url = 'https://s2.coinmarketcap.com/generated/search/quick_search.json'
  let data = await axios.get(url)
  return data.data
}