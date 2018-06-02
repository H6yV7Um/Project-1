import {SERVER, HTTP_HEADER} from 'config'
/**
 * 格式化body数据
 * @param data  数据对象
 */
const formatBody = (data) => {
    let body = null
    const filter = (value) => {
        value = new String(value)

        return value.replace(/\+/g, "%2B").replace(/\&/g, "%26")
    }

    for (const key in data) {
        const value = filter(data[key])

        body = body ? `${body}&${key}=${value}` : `${key}=${value}`
    }

    return body
}
export const request = async (url, data, dispatch) => 
{
    let result
    try
    {
        if(data)
        {
            const response = await fetch(SERVER + url, {...HTTP_HEADER, body: formatBody(data)})
            result = await response.json()
        }
        else
        {
            const response = await fetch(SERVER + url, {...HTTP_HEADER})
            result = await response.json()
        }
        
    }
    catch(e)
    {
        dispatch({type : 'NETWORK_ERROR', message : "网络状态异常，请检查您的网络连接。"})
        return {
                    "data":"",
                    "status":
                    {
                        "code":-2,
                        "message":"网络状态异常，请检查您的网络连接。"
                    }
                }
    }
    if(result.status.code==-1)
    {
        dispatch({type : 'ACCESS_DENIED'})
    }
    return result
}