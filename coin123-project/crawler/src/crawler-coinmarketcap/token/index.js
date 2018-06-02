const Token = require("./action/token")
const tokenModel = require('./models/token')
exports.start = async() => {
    let tokens = await Token.get()
    for (let token of tokens) {
        let data = {
            name: token.name,
            token: token.symbol,
            tokenId: token.id,
            ranking: token.rank,
            slug: token.slug
        }
        await tokenModel.update({name: token.name}, data, {upsert: true}, (err)=> {
            if (err) {
                console.log(err)
            }
        })
    }
}