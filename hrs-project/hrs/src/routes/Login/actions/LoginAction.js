import keyMirror from 'keymirror'
import {authorizing} from '../middlewares/LoginMiddleware'

// ------------------------------------
// Constants
// ------------------------------------
export const ACTIONS = keyMirror({
    //登录成功
    LOGIN_SUCCESS     : null
});


// ------------------------------------
// Actions
// ------------------------------------
/**
 * 执行登录
 * @param code  钉钉微应用免登授权码
 * @returns {function(*, *)}
 */
export const loginRun = (code) => {
    return (dispatch, getState) => {
        return authorizing(code).then(r => r.json()).then(json =>
        {
            if(json.status.code === 0)
            {
                dispatch({
                    type : ACTIONS.LOGIN_SUCCESS
                })
            }
            else
            {
                console.log(json.status.message)
            }
        }).catch(e =>{console.log(e)})
    }
}
