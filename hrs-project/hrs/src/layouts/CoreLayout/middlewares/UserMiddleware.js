import {request} from 'util/Common'
const CURRENT = 'organization/user/get_current'
const GETMENUS = 'organization/user/get_menus'

export const current = () => async (dispatch, getState) => {
    let result = await request(CURRENT, {}, dispatch)
    dispatch({
            type : 'CORE_CURRENT',
            data : result
        })
}


export const getMenus = () => async (dispatch, getState) => {
    dispatch({type : 'CORE_LOADING'})
    let result = await request(GETMENUS, {}, dispatch)
    dispatch({
            type : 'CORE_LOAD',
            menus : result.data
        })
}