// 数据库连接
const mongoose = require('mongoose')
const DATABASE = require('./config/database').DATABASE
const start = require('./src/token-cache')
// 没有mongoose.Promise=global.Promise会出现错误，意思就是mongoose自带的promise过期了
// 然后需要v8引擎的promise
mongoose.Promise = global.Promise
// 调试模式是mongoose提供的一个非常实用的功能，用于查看mongoose模块对mongodb
// 操作的日志，一般开发时会打开此功能，以便更好的了解和优化对mongodb的操作
mongoose.set('debug', true)
//node连接数据库
const msg = `mongodb://${DATABASE.USERNAME ? `${DATABASE.USERNAME}:${DATABASE.PASSWORD}@` : ''}${DATABASE.URI}:${DATABASE.PORT}/${DATABASE.NAME}`
console.log('msg', msg)
mongoose.connect(msg,{useMongoClient: true})
start.cache1yDate()