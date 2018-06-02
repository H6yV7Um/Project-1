import {request} from 'util/Common'
const ADD_GROUP = "organization/field/add_group"
const UPDATE_GROUP = "organization/field/update_group"
const LIST_GROUP = "organization/field/list_group"
const SORT_GROUP = "organization/field/sort_group"
const ADD_FIELD = "organization/field/add_field"
const UPDATE_FIELD = "organization/field/update_field"
const SORT_FIELD = "organization/field/sort_field"
const REMOVE_FIELD = "organization/field/remove_field"
const REMOVE_GROUP = "organization/field/remove_group"
const ORGANIZATION_LIST_ALL = "organization/department/list_all"
const ORGANIZATION_LIST = "organization/department/list_tree"

export const saveGroup = (_id, name) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_GROUP_LOADING"})
    let result
    if(!_id)
    {
        const data = {
            name
        }
        result = await request(ADD_GROUP, data, dispatch)
        
    }
    else
    {
        const data = {
            name, _id:_id.$oid
        }
        result = await request(UPDATE_GROUP, data, dispatch)
    }
    if(result)
    {
        if(result.status.code === 0)
        {
          if(_id)
          {
            return dispatch(
            {
                type: 'PROFILE_FIELD_UPDATE_GROUP',
                _id: _id,
                name: name
            })
          }
          else
          {
            return dispatch(
            {
                type: 'PROFILE_FIELD_ADD_GROUP',
                model: result.data
            })
          }
        }
    }
}

export const listGroup = () => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_LOADING"})
    let result = await request(LIST_GROUP, {}, dispatch)
    
    if(result)
    {
        if(result.status.code === 0)
        {
            return dispatch(
            {
                type: 'PROFILE_FIELD_LIST_GROUP',
                data: result.data
            })
        }
    }
}

export const sortGroup = (_id, oldIndex, newIndex) => async (dispatch, getState) => 
{
    const data = {
      _id:_id.$oid,
      old_index:oldIndex,
      new_index:newIndex
    }
    let result = await request(SORT_GROUP, data, dispatch)
}


export const saveInputField = (_id, groupid, type, name, namespace, require, modify, check, fill, regex, warning, unique, remark) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace, require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), regex, warning, unique: Number(unique), remark
    }
    
    let result = await request(url, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id: _id,
              groupid: groupid,
              _type: type,
              name: name,
              namespace: namespace,
              require: require,
              modify: modify,
              check: check,
              fill: fill,
              regex: regex,
              warning: warning,
              unique: unique,
              remark: remark
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id: _id,
              groupid: groupid,
              _type: type,
              name: name,
              namespace: namespace,
              require: require,
              modify: modify,
              check: check,
              fill: fill,
              regex: regex,
              warning: warning,
              unique: unique,
              remark: remark
            })
          }
        }
    }
}



export const saveSelectField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, options) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace, require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), remark, options: JSON.stringify(options)
    }
    let result = await request(url, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, options
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, options
            })
          }
        }
    }
}




export const saveFileField = (_id, groupid, type, name, namespace, require, modify, check, fill, filetype, size, maximum, remark) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace, require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), filetype, size, maximum, remark
    }
    let result = await request(url, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id, groupid, _type:type, name, namespace, require, modify, check, fill, filetype, size, maximum, remark
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id, groupid, _type:type, name, namespace, require, modify, check, fill, filetype, size, maximum, remark
            })
          }
        }
    }
}

export const saveDateField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace,  require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), remark, remark
    }
    let result = await request(url, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark
            })
          }
        }
    }
}


export const saveDepartmentField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace,  require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), remark, multiple: Number(multiple), treeCheckStrictly: Number(treeCheckStrictly)
    }
    let result = await request(url, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, multiple, treeCheckStrictly
            })
          }
        }
    }
}


export const saveMemberField = (_id, groupid, type, name, namespace, require, modify, check, fill, remark, multiple) => async (dispatch, getState) => 
{
    dispatch({type : "PROFILE_FIELD_ADD_FIELD_LOADING"})
    let url = ""
    if(_id)
    {
      _id = _id.$oid
      url = UPDATE_FIELD
    }
    else
    {
      url = ADD_FIELD
    }
    const data = {
      _id:_id, groupid:groupid.$oid, type, name, namespace,  require: Number(require), modify: Number(modify), check: Number(check), fill: Number(fill), remark, multiple: Number(multiple)
    }
    let result = await request(url, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
          if(_id)
          {
            _id = {"$oid":_id}
            return dispatch({
              type: 'PROFILE_FIELD_UPDATE_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, multiple
            })
          }
          else
          {
            _id = result.data
            return dispatch({
              type: 'PROFILE_FIELD_ADD_FIELD',
              _id:_id, groupid, _type:type, name, namespace, require, modify, check, fill, remark, multiple
            })
          }
        }
    }
}


export const sortField = (_id, oldIndex, newIndex) => async (dispatch, getState) => 
{
    const data = {
      _id: _id.$oid,
      old_index: oldIndex,
      new_index: newIndex
    }
    let result = await request(SORT_FIELD, data, dispatch)
}



export const removeGroup = (_id) => async (dispatch, getState) =>
{
    dispatch({type : "PROFILE_FIELD_REMOVE_GROUP_LOADING"})
    const data = {
      _id: _id.$oid
    }
    let result = await request(REMOVE_GROUP, data, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
          dispatch({type: 'PROFILE_FIELD_REMOVE_GROUP', _id:_id})
        }
    }
}





export const removeField = (_id) => async (dispatch, getState) =>
{
    dispatch({type : "PROFILE_FIELD_REMOVE_FIELD_LOADING", message : "网络状态异常，请检查您的网络连接。"})
    const data = {
      _id: _id.$oid
    }
    let result = await request(REMOVE_FIELD, data, dispatch)
    
    if(result)
    {
        if(!result.status.code)
        {
          dispatch({type: 'PROFILE_FIELD_REMOVE_FIELD', _id:_id})
        }
    }
    
}


export const getDepartment = () => async (dispatch, getState) => 
{
    dispatch({type: 'DEPARTMENT_LOADING'})
    let result = await request(ORGANIZATION_LIST, {}, dispatch)
    if(result)
    {
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'DEPARTMENT',
                departmentData : result.data
            })
        }
    }
}

export const getUsers = () => async (dispatch, getState) => 
{
    dispatch({type: 'USERS_LOADING'})
    let result = await request(ORGANIZATION_LIST_ALL, {}, dispatch)
    if(result)
    {
        
        if(!result.status.code)
        {
            dispatch(
            {
                type : 'USERS',
                usersData : result.data
            })
        }
    }
}



