import {SERVER, HTTP_HEADER} from 'config'

const AUTHORIZING = 'organization/user/authorizing'

export function authorizing (code) {
    return fetch(SERVER + AUTHORIZING, {
        ...HTTP_HEADER,
        "body": `code=${code}`
    })
}