exports.types = {
    isString : obj => (Object.prototype.toString.call(obj) === '[object String]'),
    isNumber : obj => (Object.prototype.toString.call(obj) === '[object Number]'),
    isArray : obj => (Object.prototype.toString.call(obj) === '[object Array]'),
    isDate : obj => (Object.prototype.toString.call(obj) === '[object Date]'),
    isFunction : obj => (Object.prototype.toString.call(obj) === '[object Function]'),
}