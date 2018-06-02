let configLocal = null
if (process.env.NODE_ENV === 'development') {
    configLocal = require('config/local')
}

let server = null
if (process.env.NODE_ENV === 'development') {
    server = configLocal.server
} else {
    server = 'http://meeting.tap4fun.com/api'
}

export const SERVER = server
