let dingding = null
/* global dd,DingTalkPC */
if (dd.ios) {
    dingding = dd
    dingding.os = 'ios'
} else if (dd.android) {
    dingding = dd
    dingding.os = 'android'
} else {
    dingding = DingTalkPC
    dingding.os = 'pc'
}

export default dingding
