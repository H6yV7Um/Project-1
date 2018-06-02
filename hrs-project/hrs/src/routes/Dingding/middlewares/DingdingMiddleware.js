import {SERVER, HTTP_HEADER} from 'config'
const GET_SIGNATURE = 'http://ding.tap4fun.com/client/signature'
export const getSignature = () => fetch(GET_SIGNATURE, {
    ...HTTP_HEADER,
    "method": 'GET',
    "headers": {
        'content-type': 'application/x-www-form-urlencoded',
        'Ding-Appname': 'okrs'
    }
})