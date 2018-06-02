import {SERVER} from './server'
import {dingding} from './apis/dingding'
import {user} from './apis/user'
import {meeting} from './apis/meeting'
export default {
    SERVER,
    ...dingding(SERVER),
    ...user(SERVER),
    ...meeting(SERVER)
}
