/**
 * 对时间戳进行转换
 * @param time 时间戳
 * @return res 转化好的时间
 */
exports.convertTime = (time, isShowTime) => {
    if(Object.prototype.toString.call(time) !== '[object Array]')
    {
        return convert(time, isShowTime);
    }
    else
    {
        let times = [];
        for(let i = 0; i < time.length; i++)
        {
            times.push(convert(time[i], isShowTime));
        }
        return times;
    }
}

convert = (time, isShowTime) => {
    time = Number(time);
    let now = new Date().getTime(),
        timeNum = parseInt((now - time) / 1000),
        timeYear = new Date(time).getUTCFullYear(),
        year = new Date().getUTCFullYear(),
        month = new Date().getUTCMonth() + 1,
        date = new Date().getUTCDate(),
        dayNum = parseInt((new Date(`${year}-${month}-${date + 1} 00:00`).getTime() - now) / 1000),
        mNum = null,
        sNum = null;
    if(isShowTime) {
        time = new Date(time).Format('yyyy-MM-dd hh:mm');
    } else {
        switch (true) {
            case timeNum < 0:
                if(timeYear == year) {
                    // 同一年
                    time = new Date(time).Format('MM-dd hh:mm');
                }else {
                    time = new Date(time).Format('yyyy-MM-dd hh:mm');
                }
                break;
            case timeNum < 60:
                // 60秒以内
                time = '刚刚';
                break;
            case timeNum <= 3600:
                mNum = parseInt(timeNum / 60);
                sNum = timeNum % 60;
                time = `${mNum}分钟前`;
                break;
            case timeNum < dayNum:
                time = `今天 ${new Date(time).Format('hh:mm')}`;
                break;
            case timeNum < dayNum + 86400:
                time = `昨天 ${new Date(time).Format('hh:mm')}`;
                break;
            case timeNum < dayNum + 86400 * 2:
                time = `前天 ${new Date(time).Format('hh:mm')}`;
                break;
            default:
                if(timeYear == year) {
                    // 同一年
                    time = new Date(time).Format('MM-dd hh:mm');
                }else {
                    time = new Date(time).Format('yyyy-MM-dd hh:mm');
                }
                break;
        }
    }
    return time;
}


Date.prototype.Format = function (fmt) { //
    let o = {
        "M+": this.getUTCMonth() + 1, //Month
        "d+": this.getUTCDate(), //Day
        "h+": (this.getUTCHours() == 0 ? '00' : (this.getUTCHours() + 8) % 24), //Hour
        "m+": (this.getUTCMinutes() == 0 ? '00' : this.getUTCMinutes()), //Minute
        "s+": this.getUTCSeconds(), //Second
        "q+": Math.floor((this.getUTCMonth() + 3) / 3), //Season
        "S": this.getMilliseconds() //millesecond
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getUTCFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};