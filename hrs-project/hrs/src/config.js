let server = ''
let api = ''
let credentials = 'same-origin'

if (process.env.NODE_ENV == 'development') {
    // server = 'http://okrs.tap4fun.com/api/'
    server = 'http://localhost:5000/'
    credentials = 'include'
} else {
    server = 'http://office.tap4fun.com/'
    credentials = 'same-origin'
    api = 'api/'
}
export const SERVER_NAME = server
export const SERVER = server + api
export const HTTP_HEADER =
    {
        credentials,
        "method": 'POST',
        "headers":
        {'content-type': 'application/x-www-form-urlencoded'}

    }

export const UPLOAD_HTTP_HEADER =
    {
        credentials,
        "method": 'POST',
        "headers":
        {}
    }

export const DINGDING =
    {
        "corpId": 'ding055f194a57d1af67',
        "agentId": '77290521',
        "noncestr": 'a5se512436rqwuschsew8r7t23462783'
    }