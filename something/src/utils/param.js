/**
 * Object to url args
 * @param  {Object} obj 参数对象
 * @return {String}     转换后的参数
 */
const param = (obj) => {
    let str = [];

    const paramHandle = (thisObj, keyName) => {
        for(const p in thisObj)
        {
            const type = Object.prototype.toString.call(thisObj[p]);
            if(type == '[object Object]')
            {
                paramHandle(thisObj[p], encodeURIComponent(keyName ? `${keyName}[${p}]` : p));
            }
            else
            {
                str.push(encodeURIComponent(keyName ? `${keyName}[${p}]` : p) + '=' + encodeURIComponent(type == '[object Array]' ? thisObj[p].join(',') : thisObj[p] || ''));
            }
        }
    }

    paramHandle(obj);

    return str.join('&');
}

export default param;
